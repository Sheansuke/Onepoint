import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { ClerkProvider, RedirectToSignIn } from '@clerk/nextjs'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import { SignedOutWrapper, SignedInWrapper } from '@organism/Clerk'
import { mainTheme } from '../themes'
import {MainLayout} from '@organism/layouts/MainLayout'

// put public pages here
const publicPages = ["/","/cart","/product/[slug]","/search/[query]"]

// REACT-QUERY
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname)
  

  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <ClerkProvider {...pageProps}>
          <QueryClientProvider client={queryClient}>
            <MainLayout>
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
            </MainLayout>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ClerkProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
