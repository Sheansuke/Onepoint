import { Button, Typography } from '@mui/material'

import { useAuth, useSession } from "@clerk/nextjs"

import type { NextPage } from 'next'


const Home: NextPage = () => {
  const { signOut } = useAuth()
  const { session } = useSession()

  const handleSignOut = () => {
    signOut()
  }

  return (
    <>
      <Typography variant="h1">Hola: {session.publicUserData.firstName}</Typography>
      <Button variant="contained" color="primary" size="large" onClick={handleSignOut}>
        signOut
      </Button>
    </>
  )
}

export default Home
