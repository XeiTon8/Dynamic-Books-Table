// Libraries
import React from 'react';
import {  Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Components
import { MainTable } from './components/main-table';
import { FilteredTable } from './components/filtered-table';

import { GlobalAppContext } from './context/globalContext/MyAppContext';
import './styles.scss'

function App () {
  const [books, setBooks] = React.useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true);
  const [selectedBookID, setSelectedBookID] = React.useState<string>("")
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes?q=search+terms&langRestrict=en&maxResults=20&orderBy=newest');
        const uniqueBooks = response.data.items.filter((book: any, index: number, array: any[]) => {
          return index === array.findIndex((currentBook: any) => currentBook.id === book.id);
        });
        setBooks(uniqueBooks);
        navigate('/Books');
        setLoading(false);
      } catch (error) {
        console.error(error)
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const filterBooks = (filterOption: string, rowValue: string, bookID: string) => {
    try {
        setSelectedBookID!(bookID)
        let filteredBooks = []

          switch (filterOption) {
            case 'Title':     
              filteredBooks = books.filter((book) => {
                return rowValue === 'Unknown' ? !book.volumeInfo.title : book.volumeInfo.title ? book.volumeInfo.title.includes(rowValue) : null;
            });
              setFilteredBooks(filteredBooks);
              break;


            case 'Authors':
              filteredBooks = books.filter((book) => {
              return rowValue === 'Unknown' ? !book.volumeInfo.authors : book.volumeInfo.authors ? book.volumeInfo.authors.join(', ').includes(rowValue) : null;
            });
              setFilteredBooks(filteredBooks);
              break;


            case 'Category':
            filteredBooks = books.filter((book) => {
              return rowValue === 'Unknown' ? !book.volumeInfo.categories : book.volumeInfo.categories ? book.volumeInfo.categories.join(', ').includes(rowValue) : null;
            });
              setFilteredBooks(filteredBooks);
              break;
          }
          
          location.pathname === `/${filterOption}` ? navigate(`${location.pathname}/${rowValue}`) : navigate(`/Books/${filterOption}/${rowValue}`); 
        } catch(e) {
        console.error(e);
    }}  

    return (
    <div className="wrapper">
      <GlobalAppContext.Provider value={{setSelectedBookID, selectedBookID}}>
    <Routes>
      <Route path="/Books" element={<MainTable books={books} loading={loading} filterBooks={filterBooks} />} />
      <Route path="/Books/:filterOption" element={<MainTable books={books}  loading={loading} filterBooks={filterBooks} />} />
      <Route path="/Books/:filterOption/:rowValue" element={<FilteredTable filteredBooks={filteredBooks} />} />
    </Routes>
      </GlobalAppContext.Provider>
    </div>
    );
  };


export default App