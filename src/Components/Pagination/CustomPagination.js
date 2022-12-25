import React from 'react';
import Pagination from '@mui/material/Pagination';
import "./CustomPagination.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

const CustomPagination = ({setPage, numOfPages = 10}) => {
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div className='pagination-div'>
      <ThemeProvider theme={darkTheme}>
        <Pagination count={numOfPages} onChange={(e) => handlePageChange(e.target.textContent)} color="primary"/>
      </ThemeProvider>
    </div>
  )
}

export default CustomPagination
