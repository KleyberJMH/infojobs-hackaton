import NextAuth from 'next-auth'

const infoJobsId = process.env.INFOJOBS_ID ?? ''
const callbackUri = process.env.CALLBACK_URI ?? ''
const scopes = process.env.SCOPES ?? ''
const handler = NextAuth({
  // Configure one or more auth providers
  providers: [
    {
      id: 'infojobs',
      name: 'InfoJobs',
      type: 'oauth',
      authorization: `https://www.infojobs.net/api/oauth/user-authorize/index.xhtml?scope=${scopes}&client_id=${infoJobsId}&redirect_uri=${callbackUri}&response_type=code`,
      userinfo: '',
      profile (profile) {
        return {
          id: profile.id
        }
      }
    }
  ]
})

export { handler as GET, handler as POST }
