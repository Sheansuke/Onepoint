import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { ClerkProvider, RedirectToSignIn } from '@clerk/nextjs'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SignedOutWrapper, SignedInWrapper } from '@organism/Clerk'
import { mainTheme } from '../themes'
import { MainLayout } from '@organism/layouts/MainLayout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// REACT QUERY
const queryClient = new QueryClient()

// put public pages here
const publicPages = [
  '/',
  '/contacts',
  '/cart',
  '/product/[slug]',
  '/search/[query]'
]

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname)

  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
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
        <QueryClientProvider client={queryClient}>
          <ClerkProvider {...pageProps}>
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
          </ClerkProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
