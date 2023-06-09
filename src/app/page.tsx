import { ListOfOffers } from './components/ListOfOffers'

export default async function Home () {
  return (
    <>
      <div id='toast' className='fixed bottom-2 left-2 z-40 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4' role='alert'>
        <p className='font-bold'>Notificación</p>
        <p>Se ha copiado la carta en el portapapeles.</p>
      </div>
      <main className='max-w-[1500px] px-4 mx-auto pb-24 flex flex-col items-center justify-center space-y-4'>
        <ListOfOffers />
      </main>
    </>
  )
}
