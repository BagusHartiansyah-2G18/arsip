'use client'

// import Header from '@/components/landing/Header'
// import Footer from '@/components/landing/Footer'
import Aoscompo from '@/utils/aos'
// import ScrollToTop from '@/components/landing/ScrollToTop'
import { Provider } from 'react-redux' 

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Aoscompo>
      {children}
      {/* <Header />  */}
        {/* <Provider>{children}
          </Provider>< */}
      {/* <Footer />
      <ScrollToTop /> */}
    </Aoscompo>
  )
}
