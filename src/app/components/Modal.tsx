import {
  ExclamationIcon
} from '@heroicons/react/solid'
import { Callout, TableRow, TableCell, Flex } from '@tremor/react'

export function Modal (props: {
  message: string
}) {
  const { message } = props

  if (message == null) return null

  return (
    <TableRow className='flex'>
      <TableCell colSpan={4}>
        <Flex>
          <Callout
            className='h-12 mt-4'
            title='Carta de presentación'
            icon={ExclamationIcon}
            color='teal'
          >
            {message}
          </Callout>
        </Flex>
      </TableCell>
    </TableRow>
  )
}
