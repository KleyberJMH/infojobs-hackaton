import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''
const nextAuthSecret = process.env.NEXTAUTH_SECRET ?? ''

export async function GET (req: NextRequest) {
  const session = await getToken({ req, secret: nextAuthSecret })

  const res = await fetch('https://api.infojobs.net/api/2/curriculum', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken},Bearer ${session?.accessToken ?? ''}`
    }
  })
  const data = await res.json()
  console.log({ data })
  try {
    return NextResponse.json(data)
  } catch {
    return new Response('No se pudo acceder a la información', { status: 500 })
  }
}
