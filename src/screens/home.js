import React from 'react'
import Navbar from '../components/navbar'
import Cards from '../components/cards'
import Footer from '../components/footer'
export default function Home() {
  return (
    <div>
        <Navbar></Navbar>
        <div className="d-flex justify-content-center mt-3">
          <Cards></Cards>
        </div>
        <Footer></Footer>
       
      
    </div>
  )
}
