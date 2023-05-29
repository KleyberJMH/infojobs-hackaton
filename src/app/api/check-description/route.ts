import { NextResponse } from 'next/server'
import cohere from 'cohere-ai'
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''
const cohereToken = process.env.COHERE_TOKEN ?? ''

cohere.init(cohereToken)

export async function getUserName (request: Request) {
  const session = await getServerSession(authOptions)
  console.log(session)
  if (session === null) {
    return 'User not loggedIn'
  }
  return session.user?.name
}

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
  const fullname: string = await getUserName(request) ?? ''
  const skills: string = ''
  const response = await cohere.generate({
    model: 'command-xlarge-nightly',
    prompt: `Generate a cover letter for a job application for me. Highlight my relevant skills and experience, as well as my enthusiasm for the job. Make sure to mention how i can contribute to the success of the company.
    Use this description: '${description}',
    My name is ${fullname}
    and this are my skills: '${skills}'`,
    max_tokens: 800,
    temperature: 0.3,
    k: 20,
    stop_sequences: [],
    return_likelihoods: 'NONE'
  })
  const result: string = response.body.generations[0].text
  const json = { message: `${result}` }

  try {
    return NextResponse.json(json)
  } catch {
    return new Response('No se ha podido transformar el JSON', { status: 500 })
  }
}
