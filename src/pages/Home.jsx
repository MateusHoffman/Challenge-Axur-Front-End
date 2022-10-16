import React from 'react'
import Header from '../components/Header'
import TermSearch from '../components/TermSearch'
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
      <Header />
      <TermSearch />
    </div>
  )
}

export default Home