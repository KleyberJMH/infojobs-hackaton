import { Flex, TableCell, TableRow, Accordion, AccordionHeader, AccordionBody, Icon } from '@tremor/react'
import { ClipboardIcon } from '@heroicons/react/solid'

export function Score (props: {
  message: string
}) {
  const { message } = props
  const alertCopy = () => {
    const toast = document.getElementById('toast')
    toast?.classList.add('show')
    setTimeout(function () { toast?.classList.remove('show') }, 3000)
  }

  if (message == null) return null

  return (
    <TableRow className='flex items-start'>
      <TableCell className='max-w-max'>
        <Flex>
          <Accordion className='divide-y'>
            <AccordionHeader>Carta de presentación
              <Icon
                className='ml-4'
                icon={ClipboardIcon}
                variant='light'
                tooltip='Copiar en portapapeles'
                onClick={(event) => {
                  event.stopPropagation()
                  navigator.clipboard.writeText(`${message}`).then(
                    () => {
                      alertCopy()
                    },
                    () => {
                    }
                  )
                }}
              />
            </AccordionHeader>
            <AccordionBody className='max-w-md whitespace-pre-wrap'>
              {message}
            </AccordionBody>
          </Accordion>
        </Flex>
      </TableCell>
    </TableRow>
  )
}
