'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export function LoginButton () {
  const session = useSession()
  if (session !== null) {
    return (
      <button onClick={async () => await signOut()}>Cerrar sesion</button>
    )
  }
  return (
    <>
      Inicia sesion para obtener una carta personalizada. <br />
      <button onClick={async () => await signIn()}>Iniciar sesion</button>
    </>
  )
}
