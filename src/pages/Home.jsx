import React from 'react'
import Header from '../components/Header'
import TermSearch from '../components/TermSearch'
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
      <header>
        <Header />
      </header>
      <main>
        <TermSearch />
      </main>
    </div>
  )
}

export default Home