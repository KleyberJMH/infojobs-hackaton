import InfojobsProvider from 'infojobs-next-auth-provider'
import NextAuth from 'next-auth'

const infoJobsId = process.env.INFOJOBS_ID ?? ''
const redirectUri = process.env.REDIRECT_URI ?? ''
const scopes = process.env.SCOPES ?? ''
const infoJobsSecret = process.env.INFOJOBS_SECRET ?? ''

interface Session {
  accessToken?: string,
  refreshToken?: string
}

const handler = NextAuth({
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
})

export { handler as GET, handler as POST }
