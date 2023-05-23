'use client'

import { Card, Flex, Title, TextInput, Badge, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button, Icon } from '@tremor/react'
import { getInfoJobsOffers } from '../services/getOffers'
import { Offer } from '../types'
import { Fragment, useState, useRef } from 'react'
import { Score } from './Score'
import { SearchIcon } from '@heroicons/react/solid'

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''

export function ListOfOffers (props: {
  offers: Offer[]
}) {
  const { offers } = props

  const [loading, setLoading] = useState<{ [key: string]: boolean }>({})
  const [coverLetter, setCoverLetter] = useState<{
    [key: string]: {
      message: string
    }
  }>({})

  const [offersList, setOffersList] = useState<Offer[]>(offers)

  const searchBar = useRef<any>(null)
  const searchOffers = async () => {
    if (searchBar.current?.value !== null) {
      const query: string = searchBar.current.value
      alert(query)
      const result = await getInfoJobsOffers(query)
      setOffersList(result)
    } else {
      return offersList
    }
  }

  const handleClick = async (id: string) => {
    setLoading(prevLoading => ({
      ...prevLoading,
      [id]: true
    }))

    const res = await fetch(`/api/check-description?id=${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${infoJobsToken}`
      }
    })
    const json = await res.json()

    setCoverLetter(prevCoverLetter => ({
      ...prevCoverLetter,
      [id]: json
    }))

    setLoading(prevLoading => ({
      ...prevLoading,
      [id]: false
    }))
  }

  return (
    <Card>
      <Flex className='flex space-x-2'>
        <Flex className='flex-wrap space-x-2' justifyContent='start'>
          <Title className='shrink'>Ofertas de trabajo de InfoJobs</Title>
          <Badge color='gray'>{offers.length}</Badge>
        </Flex>
        <TextInput ref={searchBar} className='max-w-md justify-items-end shrink' placeholder='Search...' />
        <Icon
          size='md'
          icon={SearchIcon}
          variant='light'
          onClick={searchOffers}
        />
      </Flex>
      <Table className='mt-6'>
        <TableHead>
          <TableRow>
            <TableHeaderCell className='max-w-xs'>Puesto</TableHeaderCell>
            <TableHeaderCell className='max-w-xs'>Provincia</TableHeaderCell>
            <TableHeaderCell className='max-w-xs'>Experiencia</TableHeaderCell>
            <TableHeaderCell className='text-center'>Acción</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {offers.map(item => (
            <Fragment key={item.id}>
              <TableRow
                className='transition-colors cursor-pointer hover:bg-sky-300' onClick={() => {
                  window.open(item.link, '_blank')
                }}
              >
                <TableCell className='max-w-xs truncate'>{item.title}</TableCell>

                <TableCell className='max-w-xs'>{item.province}</TableCell>
                <TableCell className='max-w-xs'>{item.experienceMin}</TableCell>
                <TableCell className='text-center'>
                  <Button
                    disabled={Boolean(coverLetter[item.id])}
                    loading={loading[item.id]}
                    loadingText='Generando...'
                    onClick={async (event) => {
                      event.stopPropagation()
                      await handleClick(item.id)
                    }} size='xs' variant='secondary' color='gray'
                  >
                    Generar
                  </Button>
                </TableCell>
              </TableRow>
              <Score {...coverLetter[item.id]} />
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}
