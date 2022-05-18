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
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider, EmotionCache } from '@emotion/react'
import createEmotionCache from '../themes/createEmotionCache'
import MUICookieConsent from 'material-ui-cookie-consent'
import 'react-toastify/dist/ReactToastify.css'
// import "../styles/globals.css"

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

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const { pathname } = useRouter()

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname)

  return (
    <>
      <MUICookieConsent
        cookieName="onepointCookiesConsent"
        message="Onepoint usa Cookies para mejorar tu experiencia de compra y ofrecerte una mejor experiencia de usuario. Si continúas navegando, consideramos que aceptas su uso."
      />
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
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
            <CssBaseline />
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </>
  )
}

export default MyApp
