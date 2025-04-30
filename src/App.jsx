import React from 'react'
import Search from './components/search'
import { useState, useEffect } from 'react';
import Moviecard from './components/Moviecard';
import { useDebounce } from 'react-use'
import { getTmovies, updateSearchCount } from './appwrite';


const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'Get',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errormessage, seterrormessage] = useState('');
  const [movieList, setmovieList] = useState([]);
  const [isloading, setisloading] = useState(false);
  const [trendingMovies, settrendingMovies] = useState('');
  const [debouncedsearchterm, setdebouncedsearchterm] = useState('');
  useDebounce(() => setdebouncedsearchterm(searchTerm), 500, [searchTerm]);
  useEffect(() => {
    fetchMovies(debouncedsearchterm);

  }, [debouncedsearchterm]);


  const fetchMovies = async (query = '') => {
    setisloading(true);
    seterrormessage('');
    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${API_BASE_URL}/discover/movie?sort-by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error('failed to fetch movies');

      }
      const data = await response.json();
      if (data.response === 'False') {
        seterrormessage(data.Error || 'failed to fetch movies');
        setmovieList([]);
        return;
      }
      setmovieList(data.results || [])
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);

      }


    } catch (error) {
      console.error(`Error fetching movies:${error}`);
      seterrormessage("error fetching movies");
    } finally {
      setisloading(false);
    }
  }

  const loadtrendingmovies = async () => {
    try {
      const movies = await getTmovies();
      settrendingMovies(movies);

    } catch (error) {
      console.log(`Error fetching trending movies:${error}`);


    }
  }
  useEffect(() => {
    loadtrendingmovies();

  }, []);







  return (
    <main>
      <div className='pattern'/>
      <img src="/hero-bg.png" alt='background' className='bg'></img>
      <div className='wrapper'>
        <header>
          <img src="/Movie-app/hero.png" alt='hero_banner'></img>
          <h1>Find <span className='text-gradient'>Movies</span> You'll enjoy without the Hassle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        </header>

        {trendingMovies.length > 0 && (
        <section className='trending'>
            <h2>Trending Movies</h2>

            <ul>
              {trendingMovies.map((movie, index) => (
                <li key ={movie.$id}>
                  <p>{index+1}</p>
                  <img src={movie.poster_url} alt={movie.title}/>
                </li>
              ))}
          </ul>
        </section>
        )}

      <section className='all-movies'>
        <h2 className='mt-10'>All Movies</h2>
        {isloading ? (
          <p className='text-white'>loading...</p>
        ) : errormessage ? (
          <p className='text-red-500'>{errormessage}</p>
        ) : (
          <ul>
            {movieList.map((movie) => (
              <Moviecard key={movie.id} movie={movie} />
            ))}
          </ul>
        )}


      </section>




    </div>



    </main >
  )
}

export default App