import { Card, Flex, Text, Metric, TableCell, TableRow, CategoryBar, Callout } from '@tremor/react'
import {
  TrendingUpIcon,
  TrendingDownIcon
} from '@heroicons/react/solid'
const subCategoryPercentageValues = [10, 25, 45, 20]

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
            title='Resultado del análisis'
            icon={TrendingUpIcon}
            color={'emerald'}
          >
            {message}
          </Callout>
        </Flex>

      </TableCell>
    </TableRow>
  )
}
