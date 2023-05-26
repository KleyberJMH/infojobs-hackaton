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
    prompt: `Generate a cover letter for a job application. Highlight your relevant skills and experience, as well as your enthusiasm for the job. Make sure to mention how your experience and achievements align with the requirements of the job description and how you can contribute to the success of the company.\nUsing this description: '${description}'`,
    max_tokens: 1000,
    temperature: 0.5,
    k: 342,
    stop_sequences: [],
    return_likelihoods: 'NONE'
  })
  const resultado: string = response.body.generations[0].text
  // Traducir
  console.log(resultado)
  const json = { message: `${resultado}` }

  try {
    return NextResponse.json(json)
  } catch {
    return new Response('No se ha podido transformar el JSON', { status: 500 })
  }
}
