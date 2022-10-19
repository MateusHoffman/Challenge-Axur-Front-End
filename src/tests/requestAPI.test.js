import { fetchIdTerm } from '../helpers/requestAPI'


describe('Function API', () => {
  it('Running the function that asks for the id of the term in the api', async () => {
    await fetchIdTerm()
  })
})