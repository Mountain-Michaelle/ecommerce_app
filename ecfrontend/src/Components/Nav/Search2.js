import axios from 'axios';
import React, {useState} from 'react';
import '../../Assets/scss/Results.scss';
import '../../Assets/scss/Search2.scss';
import IconSearch from '../../Assets/css/static/search.svg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { RotatingLines } from 'react-loader-spinner';
const Search2 = () => {
    const [formData, setFormData] = useState('')
    const [loading, setLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [results, setResults] = useState([])
    const [error, setError] = useState('Something went wrong')

    const handleChange = (event) => {
        setFormData(event.target.name = event.target.value)
    }

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({formData})

        if(formData !== ''){

            setLoading(true)
            setIsOpen(true)
            axios.get(`${process.env.REACT_APP_ENDPOINT_URL}/shop/search/?query=${formData}`, config)
            .then(res => {
                setResults(res.data)
                setIsOpen(true)
                setLoading(false)
                const query = formData
                navigate(`/?params=${query}`)
            })
            .catch(error => {
                setError("Something went wrong")
                setLoading(false)
                setIsOpen(true)
            })
        }
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleNavigate = (link) => {
        if(link !== ''){
            navigate(`/product/${link}/details`)
            setIsOpen(false)
        }
        
    }

    const searchs = Array.isArray(results) && results.length !== 0
    ? results
    : [];

    return(
        <>
        <form className='on-small' onSubmit={handleSubmit}>
            <input onChange={handleChange} type='text' name='query' placeholder='search here' />
            {
                loading ?
                  <button>{'....'}</button>
                 :
                 <button type='submit'><img className='icon' src={IconSearch} alt="Search" /></button>
                
            }
           
        </form>
        {
        isOpen ? 
        <div className='result-outside'>
           <div className='close' onClick={handleClose}>X</div>
            <div className='result-container'>
                {
                   loading ? 
                    <Box sx={{display:'flex', justifyContent:'center', margin:'0 auto'}}>
                        <RotatingLines
                   visible={true}
                   height="100"
                   width="100"
                   position='center'
                   ariaLabel="color-ring-loading"
                   wrapperStyle={{}}
                   wrapperClass="color-ring-wrapper"
                   colors='white'
                   strokeColor='rgb(225, 98, 0)' />
    
                    </Box>
                    :
                    <>
                      <h5>Seach result(s) for <code>{formData}</code> </h5>

                      <div className='results'>
                        {
                            results.length !== 0  ?

                            searchs.map(result => {
                                return(
                                    <div className='img-card'>
                                    <span onClick={()=> handleNavigate(result.slug)}><img src={result.images} alt="" /></span>
                                    <div className='prod-desc'>
                                    <h4>{result.name}</h4>
 
                                     <span className='price'>
                                      <h5>{result.price}</h5><small>$</small>
                                     </span>
                                     </div>
                                </div>
                                )
                            })
                            
                            :

                          <p>
                             Search result for "{formData}" not found
                          </p>
                        }
                        </div>
                    </>
                }


            </div>
        </div>

        :

        ''
        }
        </>
    )
}
export default Search2;