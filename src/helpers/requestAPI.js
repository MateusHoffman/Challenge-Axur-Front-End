import axios from "axios";

const fetchIdTerm = async (searchTerm) => {
  const keyword = { 'keyword': searchTerm };
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    url: 'http://testapp.axreng.com:3000/crawl',
    data: keyword,
  };
  try {
    const response = await axios(options)
    return response.data.id
  } catch (e) {
    return alert('Connection error, try again!')
  }
}

const fetchLinksTerm = async (selectTerm, arrResFetchTerm) => {
  if (selectTerm !== '') {
    const { id } = arrResFetchTerm.find(e => e.name === selectTerm )
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      url: `http://testapp.axreng.com:3000/crawl/${id}`,
    };
    try {
      const response = await axios(options)
      return response
    } catch (e) {
      return alert('Connection error, try again!')
    }
  }
  return console.log('Select a term');
}

export {
  fetchIdTerm,
  fetchLinksTerm
}