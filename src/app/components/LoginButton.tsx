'use client'

import { Button, Subtitle } from '@tremor/react'
import { signIn } from 'next-auth/react'

export function LoginButton () {
  const variableSession: string = 'unauthenticaed'
  if (variableSession !== 'authenticated') {
    return (
      <>
        <Subtitle>Inicia sesion para obtener una carta 100% personalizada.
        </Subtitle>
        <Button onClick={async () => await signIn()} size='xs'>Iniciar Sesion</Button>
      </>
    )
  } else {
    return (
      <Button size='xs'>Cerrar Sesion</Button>
    )
  }
}
