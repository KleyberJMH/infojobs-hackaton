import { NextResponse } from 'next/server'

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''

export async function GET (request: Request) {
  const res = await fetch('https://api.infojobs.net/api/2/curriculum', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}` // sacas el infojobs token, etc.
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
