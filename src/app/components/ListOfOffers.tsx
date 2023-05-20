'use client'

import { Card, Flex, Title, Badge, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Button, Text } from '@tremor/react'

import { Offer } from '../types'
import { Fragment, useState } from 'react'
import { Score } from './Score'

const infoJobsToken = process.env.INFOJOBS_TOKEN ?? ''

export function ListOfOffers (props: {
  offers: Offer[]
}) {
  const { offers } = props

  const [loading, setLoading] = useState<{ [key: string]: boolean }>({})
  const [coverLetter, setCoverLetter] = useState<{ [key: string]: {
    message: string
  } }>({})

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
      <Flex justifyContent='start' className='space-x-2'>
        <Title>Ofertas de trabajo de InfoJobs</Title>
        <Badge color='gray'>{offers.length}</Badge>
      </Flex>
      <Text className='mt-2'>Las últimas ofertas de trabajo</Text>
      <Table className='mt-6'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Puesto</TableHeaderCell>
            <TableHeaderCell>Provincia</TableHeaderCell>
            <TableHeaderCell>Experiencia</TableHeaderCell>
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
                <TableCell>{item.title}</TableCell>

                <TableCell>{item.province}</TableCell>
                <TableCell>{item.experienceMin}</TableCell>
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
