import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = 'https://api.infojobs.net'
const CURRICULUM_ENDPOINT = `${BASE_URL}/api/2/curriculum`
const EXPERIENCE_ENDPOINT = (id: string) => `${BASE_URL}/api/2/curriculum/${id}/experience`
const CLIENT_ID = process.env.INFOJOBS_ID ?? ''
const CLIENT_SECRET = process.env.NEXTAUTH_SECRET ?? ''
const BASIC_TOKEN = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  'base64'
)

export interface ICurriculum {
  id?: number
  code?: string
  name?: string
  principal?: boolean
  completed?: boolean
  incompleteSteps?: string[]
}

export async function GET (req: NextRequest) {
  const session = await getToken({ req, secret: CLIENT_SECRET })
  if (session == null) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  const accessToken = session.accessToken
  const resListCurriculums = await fetch(CURRICULUM_ENDPOINT, {
    headers: {
      Authorization: `Basic ${BASIC_TOKEN},Bearer ${accessToken ?? ''}`
    }
  })
  const data = await resListCurriculums.json()
  console.log({ data })

  const getPrincipalCurriculum = data.find((curriculum: ICurriculum) => curriculum.principal === true)

  if (getPrincipalCurriculum === true) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const curriculum = getPrincipalCurriculum

  const resExperiences = await fetch(EXPERIENCE_ENDPOINT(curriculum.code), {
    headers: {
      Authorization: `Basic ${BASIC_TOKEN},Bearer ${accessToken ?? ''}`
    }
  })

  const dataExperience = await resExperiences.json()

  return NextResponse.json({
    dataExperience
  })
}
