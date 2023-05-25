const infoJobsId = process.env.INFOJOBS_ID ?? ''
const infoJobsSecret = process.env.INFOJOBS_SECRET ?? ''
const redirectUri = process.env.REDIRECT_URI ?? ''

export async function POST (request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code') ?? ''

  const res = await fetch(`https://www.infojobs.net/oauth/authorize?grant_type=authorization_code&code=${code}&client_id=${infoJobsId}&client_secret=${infoJobsSecret}&redirect_uri=${redirectUri}`)
  const data = await res.json()
  console.log({ data })
}
