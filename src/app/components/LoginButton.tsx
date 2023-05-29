'use client'

import { Button, Subtitle } from '@tremor/react'
import { useSession, signIn, signOut } from 'next-auth/react'

export function LoginButton () {
  const { status } = useSession()
  if (status !== 'authenticated') {
    return (
      <>
        <Subtitle>Inicia sesion para obtener una carta 100% personalizada.
        </Subtitle>
        <Button onClick={async () => await signIn()} size='xs'>Iniciar Sesion</Button>
      </>
    )
  } else {
    return (
      <Button onClick={async () => await signOut()} size='xs'>Cerrar Sesion</Button>
    )
  }
}
