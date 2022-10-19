import React, { useEffect, useState } from 'react'
import Progress from "react-svg-progress";

import { fetchIdTerm,fetchLinksTerm } from '../helpers/requestAPI';
import { getStorage, removeStorage, setStorage } from '../helpers/localStorage';

import LogoAxur from '../images/Logo-Axur.svg'
import IconSearch from '../images/icon-search.svg'
import IconDeleteBlack from '../images/icon-X-black.svg'
import IconDeleteWhite from '../images/icon-X-white.svg'
import './TermSearch.css'
import './Carousel.css'


const TermSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [arrResFetchTerm, setArrResFetchTerm] = useState([]);
  const [objResFetchLink, setObjResFetchLink] = useState({});
  const [termExists, setTermExists] = useState(false)
  const [selectTerm, setSelectTerm] = useState('');

  const requestGetLinksTerm = async () => {
    if (arrResFetchTerm[0]) {
      const response = await fetchLinksTerm(selectTerm, arrResFetchTerm)
      if (response) setObjResFetchLink(response.data)
    }
  }

  const requestGetIdTerm = async () => {
    const id = await fetchIdTerm(searchTerm)
    setArrResFetchTerm([...arrResFetchTerm, { name: searchTerm, id }])
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
      return requestGetIdTerm()
    }
  };

  const updateTermHistory = () => {
    const arrTerm = getStorage('terms');
    if (arrTerm.length > 0) return setArrResFetchTerm(arrTerm);
  }

  const handleDeleteButton = (id) => {
    const newArr = removeStorage('terms', id)
    return setArrResFetchTerm(newArr)
  }

  useEffect(() => updateTermHistory(), []);

  useEffect(() => setStorage('terms', arrResFetchTerm), [arrResFetchTerm]);

  useEffect(() => {
    if (searchTerm.length > 4) setDisableButton(false);
    if (searchTerm.length < 5 || searchTerm.length > 31) setDisableButton(true);
  }, [searchTerm]);

  useEffect(() => {
    requestGetLinksTerm()
  }, [selectTerm, arrResFetchTerm]);

  return (
    <div className='term-search' >
      <header>
        <img src={ LogoAxur } alt="Logo Axur" />
      </header>
      <main>
        <form className='form-search'>
          <input
            data-testid="inputSearch"
            type="text"
            placeholder={ termExists ? 'Existing term, enter another' : 'Search'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type='submit'
            data-testid="btnSearch"
            disabled={ disableButton }
            onClick={(e) => processTermRequest(searchTerm, e)}
          >
            <img src={ IconSearch } alt="Icon search" />
          </button>
        </form>
        <div className='div-term-carousel'>
          <div className='carousel'>
            {
              arrResFetchTerm.map((term, index) => 
              <div
                key={index}
                data-testid={ `${term.name}-item-carousel` }
                onClick={ (e) => setSelectTerm(e.target.innerText) }
                className={`item-carousel ${selectTerm === term.name ? 'item-selected' : ''}`}
              >
                <p data-testid={`name-${term.name}`}>{term.name}</p>
                <button
                onClick={ () => handleDeleteButton(term.id) }
              >
                <img src={ selectTerm === term.name ? IconDeleteWhite : IconDeleteBlack } alt="Delete icon" />
              </button>
              </div> )
            }
          </div>
        </div>
      </main>
      {
        arrResFetchTerm && arrResFetchTerm.length > 0
        && (
          <footer>
            <div className='div-load' data-testid='div-load'>
              {
                objResFetchLink.status === 'active'
                && (<Progress size={30} strokeWidth={2} color={'#000000'} />)
              }
            </div>
            <div
              className='div-urls'
              data-testid='div-urls'
              style={objResFetchLink.status !== 'active' ? {height: '80%'} : {height: '75%'}}
            >
            {
              objResFetchLink.urls
              && (objResFetchLink.urls.map((link, index) => (
                  <div key={index}>
                    <a href={link} target="_blank" rel="noreferrer">{link.replace("http://hiring.axreng.com", "")}</a>
                  </div>
                ))
              )
            }
            </div>
          </footer>
        )
      }
    </div>
  )
}

export default TermSearch