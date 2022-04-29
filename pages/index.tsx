import { NextSeo } from 'next-seo'
import type { NextPage } from 'next'
import { Button, Typography, useTheme } from '@mui/material'
import { useAuth, useSession } from '@clerk/nextjs'

const Home: NextPage = () => {
  const { palette } = useTheme()
  const { signOut } = useAuth()
  const { session } = useSession()

  const handleSignOut = () => {
    signOut()
  }

  return (
    <>
      <NextSeo
        title="Onepoint - home"
        description="Onepoint tu papeleria online"
      />
      <Typography variant="h1">
        Hola: {session.publicUserData.firstName}
      </Typography>
      <Button variant="contained" size="large" onClick={handleSignOut}>
        signOut
      </Button>
    </>
  )
}

export default Home
