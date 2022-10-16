import React, { useEffect, useState } from 'react'
import axios from 'axios';

// import TermCarousel from './TermCarousel';

import LogoAxur from '../images/Logo-Axur.svg'
import IconSearch from '../images/icon-search.svg'
import './TermSearch.css'

const TermSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [arrResFetchTerm, setArrResFetchTerm] = useState([{name: 'Linux'},{name: 'Axur'}]);
  const [termExists, setTermExists] = useState(false)

  const requestApiTerm = async () => {
    const keyword = { 'keyword': searchTerm };
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      url: 'http://testapp.axreng.com:3000/crawl',
      data: keyword,
    };
    try {
      await axios(options)
        .then((response) => setArrResFetchTerm([...arrResFetchTerm, { name: searchTerm, id: response.data.id }]));
    } catch (e) {
      return alert('erro de conexão!')
    }
    console.log(arrResFetchTerm);
  }

  const processTermRequest = (term, e) => {
    e.preventDefault();
    const thisTermExists = arrResFetchTerm.find(e => e.name === term)
    if (thisTermExists) {
      setSearchTerm('')
      return setTermExists(true)
    }
    if (!thisTermExists) {
      setSearchTerm('')
      setTermExists(false);
      return requestApiTerm()
    }
  };

  useEffect(() => {
    if (searchTerm.length > 4) setDisableButton(false);
    if (searchTerm.length < 5 || searchTerm.length > 31) setDisableButton(true);
  }, [searchTerm]);

  return (
    <div className='term-search'>
      <header>
        <img src={ LogoAxur } alt="Logo Axur" />
      </header>
      <main>
        <form>
          <input
            type="text"
            placeholder={ termExists ? 'Existing term, enter another' : 'Search'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type='submit'
            disabled={ disableButton }
            onClick={(e) => processTermRequest(searchTerm, e)}
          >
            <img src={ IconSearch } alt="Icon search" />
          </button>
        </form>
        {/* <TermCarousel /> */}
        {
          arrResFetchTerm.map((term, index) => (
            <div key={index}>
              <div>
                <p>{term.name}</p>
              </div>
            </div>
          ))
        }
      </main>
      <footer>
        {/* Load */}
      </footer>
    </div>
  )
}

export default TermSearch