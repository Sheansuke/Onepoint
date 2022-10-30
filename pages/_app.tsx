import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { ClerkProvider, RedirectToSignUp } from '@clerk/nextjs';
import { SignedInWrapper, SignedOutWrapper } from '@organism/Clerk';
import { MainLayout } from '@organism/layouts/MainLayout';

import { store } from '../redux/store';

// REACT QUERY
const queryClient = new QueryClient()

// put public pages here
const publicPages = [
  '/',
  '/contacts',
  '/cart',
  '/product/[slug]',
  '/search/[query]',
  "/test"
]

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname)

  return (
    <>
      <Provider store={store}>
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
                    <RedirectToSignUp redirectUrl='/' afterSignUpUrl='/'  />
                  </SignedOutWrapper>
                </>
              )}
            </MainLayout>
          </ClerkProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <ToastContainer />
      </Provider>
    </>
  )
}

export default MyApp
