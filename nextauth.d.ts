
import NextAuth from 'next-auth'

declare module 'next-auth' {
  /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
  interface Session {
    accessToken?: string
    refreshToken?: string
    user: {
    } & User
  }

  interface User {

  }
}
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken?: string
    refreshToken?: string
  }
}
