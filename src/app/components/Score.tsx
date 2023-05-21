import { Flex, TableCell, TableRow, Callout } from '@tremor/react'
import {
  TrendingUpIcon
} from '@heroicons/react/solid'

export function Score (props: {
  message: string
}) {
  const { message } = props

  if (message == null) return null

  return (
    <TableRow className='flex'>
      <TableCell colSpan={4}>
        <Flex>
          <Callout
            className='max-w-md whitespace-pre-wrap'
            title='Carta de presentación'
            icon={TrendingUpIcon}
            color='emerald'
          >
            {message}
          </Callout>
        </Flex>
      </TableCell>
    </TableRow>
  )
}
