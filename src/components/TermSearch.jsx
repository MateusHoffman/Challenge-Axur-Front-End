import React, { useEffect, useState } from 'react'
import Progress from "react-svg-progress";

import { fetchIdTerm,fetchLinksTerm } from '../helpers/requestAPI';
import TermCarousel from './TermCarousel';

import LogoAxur from '../images/Logo-Axur.svg'
import IconSearch from '../images/icon-search.svg'
import './TermSearch.css'
import { getStorage, removeStorage, setStorage } from '../helpers/localStorage';

const TermSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const [arrResFetchTerm, setArrResFetchTerm] = useState([]);
  const [objResFetchLink, setObjResFetchLink] = useState({});
  const [termExists, setTermExists] = useState(false)
  const [selectTerm, setSelectTerm] = useState('');

  const requestGetLinksTerm = async () => {
    const response = await fetchLinksTerm(selectTerm, arrResFetchTerm)
    if (response) setObjResFetchLink(response.data)
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
  }, [selectTerm, arrResFetchTerm, objResFetchLink]);

  return (
    <div className='term-search' >
      <header>
        <img src={ LogoAxur } alt="Logo Axur" />
      </header>
      <main>
        <form className='form-search'>
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
        <div className='div-term-carousel'>
          <TermCarousel
            arrResFetchTerm={ arrResFetchTerm }
            handleDeleteButton={ handleDeleteButton }
            selectTerm={ selectTerm }
            setSelectTerm={ setSelectTerm }
          />
        </div>
      </main>
      {
        arrResFetchTerm && arrResFetchTerm.length > 0
        && (
          <footer>
            {
              objResFetchLink !== {} && selectTerm !== ''
              && (
                <>
                  <div className='div-load'>
                    {
                      objResFetchLink.status === 'active'
                      && (<Progress size={30} strokeWidth={2} color={'#000000'} />)
                    }
                  </div>
                  <div
                    className='div-urls'
                    style={objResFetchLink.status !== 'active' ? {height: '75%'} : {height: '55%'}}
                  >
                    {
                      objResFetchLink.urls
                      && (
                        objResFetchLink.urls.map((link, index) => (
                          <div key={index}>
                            <a href={link} target="_blank" rel="noreferrer">{link.replace("http://hiring.axreng.com", "")}</a>
                          </div>
                        ))
                      )
                    }
                </div>
              </>
              )
            }
          </footer>
        )
      }
    </div>
  )
}

export default TermSearch