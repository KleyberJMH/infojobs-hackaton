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
  const accessToken = session?.accessToken ?? ''

  async function getSkills () {
    if (accessToken !== '') {
      const resListCurriculums = await fetch('https://api.infojobs.net/api/2/curriculum', {
        headers: {
          Authorization: `Basic ${infoJobsToken},Bearer ${accessToken ?? ''}`
        }
      })
      const data = await resListCurriculums.json()

      const getPrincipalCurriculum = data.find((curriculum: ICurriculum) => curriculum.principal === true)

      const curriculum = getPrincipalCurriculum
      const code: string = curriculum.code

      const resSkills = await fetch(`https://api.infojobs.net/api/2/curriculum/${code}/skill`, {
        headers: {
          Authorization: `Basic ${infoJobsToken},Bearer ${accessToken ?? ''}`
        }
      })
      const dataSkill: DataSkill = await resSkills.json()
      const textSkills: string = dataSkill.expertise.map(({ skill }) => skill).join(', ')
      return textSkills
    }
  }

  if (id == null) return new Response('Missing id', { status: 400 })

  const description: string = await getOfferDescriptionById(id)
  const fullname: string = session?.user.name ?? '[Your Name]'
  const skills = await getSkills() ?? '[Your Skills]'
  const skillsAndName = `, My name is ${fullname} and this are my skills: ${skills}`
  const response = await cohere.generate({
    model: 'command-xlarge-nightly',
    prompt: `Generate a cover letter for a job application for me. Highlight my relevant skills and experience, as well as my enthusiasm for the job. Make sure to mention how i can contribute to the success of the company.
    Use this description: '${description}'
    ${skillsAndName}`,
    max_tokens: 300,
    temperature: 0.5,
    k: 10,
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
