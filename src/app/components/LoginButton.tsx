'use client'

import { Button, Subtitle } from '@tremor/react'

export function LoginButton () {
  const variableSession: string = 'unauthenticaed'
  if (variableSession !== 'authenticated') {
    return (
      <>
        <Subtitle>Inicia sesion para obtener una carta 100% personalizada.
        </Subtitle>
        <a href='/api/auth/signin/infojobs'>
          <Button size='xs'>Iniciar Sesion
          </Button>
        </a>
      </>
    )
  } else {
    return (
      <Button size='xs'>Cerrar Sesion</Button>
    )
  }
}
