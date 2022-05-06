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
import { MainLayout } from '@organism/layouts/MainLayout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// put public pages here


// TODO: eta vaina hay que dejala como taba anteriol mente le llegate?
const publicPages = [
  '/',
  '/contacts',
  '/cart',
  '/product/[slug]',
  '/search/[query]'
]

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
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
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
            <ToastContainer />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ClerkProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
