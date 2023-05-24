'use client'

import { ListOfOffers } from './components/ListOfOffers'
import { getInfoJobsOffers } from './services/getOffers'
import { useState, useEffect } from 'react'
import { Offer } from './types'

export default async function Home () {
  const [offersList, setOffersList] = useState<Offer[]>([])
  const [queryString, setQueryString] = useState('')

  useEffect(() => {
    let ignore = false
    setQueryString('javascript')
    setOffersList([])
    getInfoJobsOffers(queryString).then(result => {
      if (!ignore) {
        setOffersList(result)
      }
    }).catch(error => { console.log('error fetch the offers:', error) })
    return () => { ignore = true }
  }, [queryString])
  return (
    <>
      <div id='toast' className='fixed bottom-2 left-2 z-40 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4' role='alert'>
        <p className='font-bold'>Notificación</p>
        <p>Se ha copiado la carta en el portapapeles.</p>
      </div>
      <main className='max-w-[1500px] px-4 mx-auto pb-24'>
        <ListOfOffers offersList={offersList} setOffersList={setOffersList} />
      </main>
    </>
  )
}
