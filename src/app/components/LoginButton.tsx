'use client'

import { Button, Subtitle } from '@tremor/react'
import { useSession, signIn, signOut } from 'next-auth/react'

export function LoginButton () {
  const { data, status } = useSession()
  if (status !== 'authenticated') {
    return (
      <>
        <Subtitle>Inicia sesion para obtener una carta 100% personalizada.
        </Subtitle>
        <Button onClick={async () => await signIn('infojobs')} size='xs'>Iniciar Sesion</Button>
      </>
    )
  } else {
    return (
      <>
        <Subtitle>{data.user?.email ?? ''}
        </Subtitle>
        <Button onClick={async () => await signOut()} size='xs'>Cerrar Sesion</Button>
      </>
    )
  }
}
