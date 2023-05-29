import { NextResponse } from 'next/server'
import cohere from 'cohere-ai'

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''
const cohereToken = process.env.COHERE_TOKEN ?? ''
const rapidApiKey = process.env.RAPIDAPI_KEY ?? ''

cohere.init(cohereToken)

export interface APIResultTranslate {
  detectedLanguage: DetectedLanguage
  translations: Translation[]
}

export interface DetectedLanguage {
  language: string
  score: string
}

export interface Translation {
  text: string
  transliteration: Transliteration
  to: string
  alignment: Alignment
  sentLen: SentLen
}

export interface Alignment {
  proj: string
}

export interface SentLen {
  srcSentLen: SrcSentLenElement[]
  transSentLen: SrcSentLenElement[]
}

export interface SrcSentLenElement {
  integer: string
}

export interface Transliteration {
  text: string
  script: string
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

async function translate (message: string) {
  const url = 'https://microsoft-translator-text.p.rapidapi.com/translate?to[0]=es&api-version=3.0&textType=plain&profanityAction=NoAction'
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
      },
      body: JSON.stringify(
        {
          Text: message
        }
      )
    })

    if (response.ok) {
      const item: APIResultTranslate[] = await response.json()
      console.log(item[0].translations[0].text)
      return item[0].translations[0].text
    }
  } catch (err) {
    console.error(err)
  }
}

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id == null) return new Response('Missing id', { status: 400 })

  const description: string = await getOfferDescriptionById(id)
  const skills: string = ''
  const fullname: string = ''
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
  // Traducir
  const resultado = await translate(result)
  const json = { message: `${resultado ?? ''}` }

  try {
    return NextResponse.json(json)
  } catch {
    return new Response('No se ha podido transformar el JSON', { status: 500 })
  }
}
