import { NextResponse } from 'next/server'


const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''
const cohereToken = process.env.COHERE_TOKEN ?? ''
const cohereUrl = process.env.COHERE_URL ?? ''


async function getOfferDescriptionById (id: string) {
  const res = await fetch(`https://api.infojobs.net/api/7/offer/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}`
    }
  })

  const {description}  = await res.json()

  return description
}

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id == null) return new Response('Missing id', { status: 400 })

  const description = await getOfferDescriptionById(id)

  const data = {
    model: 'xlarge',
    prompt: `Return message about a cover letter JSON response with the next format:
    --
    Description: "Modalidad de trabajo híbrido - 3 días en casa/ 2 en oficinas
    Todos los viernes intensivo + intensivo los meses de julio y agosto.
    
    FRONTEND:
    - ReactJS
    - Redux
    - Sagas
    - Hooks
    - SCCS/SAAS.
    
    BACKEND:
    - Python
    - Flask
    - FastAPI
    - Pandas
    - SQLAchemy
    
    GENERAL:
    - Arquitecturas DDD
    - Arquitecturas Flux
    - TDD
    - SQL
    - S.O.L.I.D
    - Docker
    
    (Se valorará positivamente certificado de discapacidad 33%)"
    
    Result: "{
      "message": "I am writing to express my interest in the position.\n\nI have experience and proficiency in these technologies, and I am confident in my ability to contribute to the team and deliver high-quality results.\n\nAdditionally, I wanted to mention that I have a disability certificate of 33% which I believe can bring unique perspectives and diversity to the team. I hope this will be positively valued in the selection process.\n\nThank you for considering my application. I look forward to the opportunity to further discuss how my skills and experiences align with the requirements of the position."
    }"
    --
    Description: "${description}"
Result: "

    `,
    max_token:300,
    temperature: 0.3,
    k: 0,
    p: 1,
    frequency_penalty:0,
    presence_penalty:0,
    stop_sequences: ["--"],
    return_likelihoods: 'NONE'    
  }

  const response = await fetch(cohereUrl,{
    method:'POST',
    headers: {
        Authorization: `BEARER ${cohereToken}`,
        "Content-Type": 'application/json',
        "Cohere-Version": '2022-12-06'
    },
    body: JSON.stringify(data)
}).then(res => res.json())


  const result = response.body.generation[0].text ?? ''
  console.log(result)

  try {
    return NextResponse.json(result)
  } catch {
    console.log({data})
    console.log({result})
    return new Response('No se ha podido transformar el JSON', { status: 500 })
  }
}
