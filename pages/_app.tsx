import { ThemeProvider } from '@mui/material'
import { ClerkProvider, RedirectToSignIn } from '@clerk/nextjs';
import { SignedOutWrapper, SignedInWrapper } from "@organism/Clerk"
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app'
import { mainTheme } from '../themes'

const publicPages = [];


function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);

  return (
    <ThemeProvider theme={mainTheme}>
      <ClerkProvider {...pageProps}>
        {isPublicPage ? (
          <Component {...pageProps} />
        ) : (
          <>
            <SignedInWrapper>
              <Component {...pageProps} />
            </SignedInWrapper>
            <SignedOutWrapper>
              <RedirectToSignIn />
            </SignedOutWrapper>
          </>
        )}
      </ClerkProvider>
    </ThemeProvider>
  )
}

export default MyApp
