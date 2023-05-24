import { NextResponse } from 'next/server'

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  const res = await fetch(`https://api.infojobs.net/api/7/offer?q=${query ?? ''}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}` // sacas el infojobs token, etc.
    }
  })
  const data = await res.json()
  try {
    return NextResponse.json(data)
  } catch {
    return new Response('No se pudo acceder a la información', { status: 500 })
  }
}
