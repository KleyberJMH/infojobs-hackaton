import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import cohere from 'cohere-ai'

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''
const cohereToken = process.env.COHERE_TOKEN ?? ''

cohere.init(cohereToken)

export interface ICurriculum {
  id?: number
  code?: string
  name?: string
  principal?: boolean
  completed?: boolean
  incompleteSteps?: string[]
}

export interface APIResultSkills {
  dataSkill: DataSkill
}

export interface DataSkill {
  expertise: Expertise[]
  language: Language[]
}

export interface Expertise {
  skill: string
  level: string
}

export interface Language {
  id: number
  writing: string
  comments: string
  reading: string
  speaking: string
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
  const session = await getServerSession(authOptions)
  const accessToken = session?.accessToken

  async function getSkills () {
    const resListCurriculums = await fetch('https://api.infojobs.net/api/2/curriculum', {
      headers: {
        Authorization: `Basic ${infoJobsToken},Bearer ${accessToken ?? ''}`
      }
    })
    const data = await resListCurriculums.json()
    console.log({ data })

    const getPrincipalCurriculum = data.find((curriculum: ICurriculum) => curriculum.principal === true)
    if (getPrincipalCurriculum === true) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const curriculum = getPrincipalCurriculum
    const code: string = curriculum.code

    const resSkills = await fetch(`https://api.infojobs.net/api/2/curriculum/${code}/skill`, {
      headers: {
        Authorization: `Basic ${infoJobsToken},Bearer ${accessToken ?? ''}`
      }
    })

    const dataSkill: APIResultSkills = await resSkills.json()

    console.log(`Dentro de getCV: ${dataSkill.dataSkill.expertise[0].skill}`)

    const textSkills: string = ''
    console.log(textSkills)

    return NextResponse.json({
      dataSkill
    })
  }

  if (id == null) return new Response('Missing id', { status: 400 })

  const description: string = await getOfferDescriptionById(id)
  const fullname: string = session?.user.name ?? ''
  console.log(await getSkills())
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
