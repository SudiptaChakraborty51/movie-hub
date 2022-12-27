import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Series.css';
import SingleContent from '../../SingleContent/SingleContent';
import CustomPagination from '../../Pagination/CustomPagination';
import Genres from '../../Genres';
import useGenre from '../../../hooks/useGenre';

const Series = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);

  const fetchSeries = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    fetchSeries();
    // eslint-disable-next-line
  }, [page, genreforURL]);

  return (
    <div>
      <span className='pageTitle'>TV Series</span>
      <Genres 
        type=""
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}     
      />
      <div className='series'>
        {
          content && content.map((item) => 
            <SingleContent 
              key={item.id} 
              id={item.id} 
              poster={item.poster_path}
              title={item.title || item.name} 
              date={item.first_air_date || item.release_date}
              media_type="tv"
              vote_average={item.vote_average}
            />)
        }
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
      )}
    </div>
  )
}

export default Series
