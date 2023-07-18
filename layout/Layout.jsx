import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import React from 'react'

const Layout = ({children}) => {
  return (
    <React.Fragment>
      <Header/>
      <main>
        {children}
      </main>
      <Footer/>
    </React.Fragment>
  )
}

export default Layout
