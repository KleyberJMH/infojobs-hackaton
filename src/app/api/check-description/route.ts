import { NextResponse } from 'next/server'
import cohere from 'cohere-ai'

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''
const cohereToken = process.env.COHERE_TOKEN ?? ''

cohere.init(cohereToken)

async function getOfferDescriptionById (id: string) {
  const res = await fetch(`https://api.infojobs.net/api/7/offer/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}`
    }
  })

  const { description } = await res.json()

  return description
}

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id == null) return new Response('Missing id', { status: 400 })

  const description: string = await getOfferDescriptionById(id)

  const response = await cohere.generate({
    model: 'command-xlarge-nightly',
    prompt: `Write a cover letter for a job application in english using this description '${description}'`,
    max_tokens: 300,
    temperature: 0.3,
    k: 0,
    p: 1,
    stop_sequences: [],
    return_likelihoods: 'NONE'
  })
  const resultado: string = response.body.generations[0].text
  console.log(resultado)
  const json = { message: `${resultado}` }

  try {
    console.log(json.message)
    return NextResponse.json(json)
  } catch {
    return new Response('No se ha podido transformar el JSON', { status: 500 })
  }
}
