import { Logo } from './components/Logo'
import AuthProvider from './components/AuthProvider'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'InfoJobs - Generador de cartas de presentación',
  description: 'Una pequeña herramienta que te ayuda generar las mejores cartas de presentaciones para las ofertas de InfoJobs'
}

export default function RootLayout ({
  children,
  session
}: {
  children: React.ReactNode
  session: any
}) {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <AuthProvider session={session}>
          <header className='py-10'>
            <h1 className='flex flex-col items-center justify-center text-lg'>
              <Logo />
              <strong className='font-semibold tracking-wider text-black/80'>Generador de cartas de presentación</strong>
            </h1>
          </header>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
