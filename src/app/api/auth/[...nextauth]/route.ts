import InfojobsProvider from 'infojobs-next-auth-provider'
import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'

const infoJobsId = process.env.INFOJOBS_ID ?? ''
const redirectUri = process.env.REDIRECT_URI ?? ''
const scopes = process.env.SCOPES ?? ''
const infoJobsSecret = process.env.NEXTAUTH_SECRET ?? ''

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    refreshToken?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    InfojobsProvider({
      clientId: infoJobsId,
      clientSecret: infoJobsSecret,
      redirect_uri: redirectUri,
      infojobs_scopes: scopes
    })
  ],
  callbacks: {
    async jwt ({ token, account }) {
      if (account !== null) {
        token.accesToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      return token
    },
    async session ({ session, token }) {
      session.accessToken = token.accessToken as string
      session.refreshToken = token.refreshToken as string
      return session
    }
  }
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
