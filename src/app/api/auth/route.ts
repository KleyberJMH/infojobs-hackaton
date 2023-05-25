import { NextResponse } from 'next/server'

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('code')

  /* const res = await fetch(`https://api.infojobs.net/api/7/offer?q=${query ?? ''}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}` // sacas el infojobs token, etc.
    }
  })
   const data = await res.json()
  */

  console.log(query)

  try {
    return NextResponse.json({ code: query })
  } catch {
    return new Response('No se pudo acceder a la información', { status: 500 })
  }
}
