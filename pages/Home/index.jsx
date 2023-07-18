import About from '@/components/About'
import Campaigns from '@/components/Campaigns'
import Carousel from '@/components/Carousel'
import Reservation from '@/components/Reservation'
import MenuWrapper from '@/components/product/MenuWrapper'
import Customers from '@/components/customers/Customers'
import React from 'react'

const Index = () => {
  return (
    <React.Fragment >
     <Carousel/>
     <Campaigns/>
     <MenuWrapper/>
     <About/>
     <Reservation/>
     <Customers/>
    </React.Fragment>
  )
}

export default Index
