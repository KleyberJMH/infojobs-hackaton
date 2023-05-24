const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''

export interface APIResultOffer {
  id: string
  title: string
  province: Category
  city: string
  link: string
  description: string
  category: Category
  contractType: Category
  subcategory: Category
  salaryMin: Category
  salaryMax: Category
  salaryPeriod: Category
  experienceMin: Category
  workDay: Category
  study: Category
  published: Date
  updated: Date
  author: Author
  requirementMin: string
  bold: boolean
  applications: string
  subSegment: number
  executive: boolean
  salaryDescription: string
  urgent: boolean
  color: boolean
  teleworking?: Category
}

interface Author {
  id: string
  name: string
  uri: string
  logoUrl: string
  corporateResponsive: boolean
  showCorporativeHeader: boolean
}

interface Category {
  id: number
  value: string
}
const url = process.env.NODE_ENV === 'production' ? 'https://infojobs-hackaton-kleyberjmh.vercel.app' : 'http://localhost:3000'
export async function getInfoJobsOffers (query: string = '') {
  const res = await fetch(`${url}/api/getOffers?q=${query}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${infoJobsToken}`
    }
  })

  const { items }: { items: APIResultOffer[] } = await res.json()

  const listOfOffers = items.map(item => {
    const { id, title, province, experienceMin, link } = item

    return {
      id,
      title,
      province: province.value,
      experienceMin: experienceMin.value,
      link
    }
  })

  return listOfOffers
}
