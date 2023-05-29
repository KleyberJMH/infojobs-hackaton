import { NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export async function GET (request: Request) {
  const session = await getServerSession(authOptions)
  if (session === null) {
    return NextResponse.json({ message: 'User not loggedIn' })
  }
  return NextResponse.json(session)
}
