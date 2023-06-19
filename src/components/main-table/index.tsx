import React from 'react'
import {useLocation} from 'react-router-dom'
import {GlobalAppContext} from '../../context/globalContext/MyAppContext'
import {BreadCrumbs} from '../breadcrumbs'
import './main-table.scss'

interface MainTableProps {
  books: any[], 
  loading: boolean,
  filterBooks: (filterOption: string, rowValue: string, bookID: string) => void
}

export const MainTable: React.FC<MainTableProps> = ({ books, loading, filterBooks }) => {

    const location = useLocation();
    const {selectedBookID} = React.useContext(GlobalAppContext)

    const renderBooks = () => {
        return books.map((book, index) => {
          const delay = index * 100;
            return (
              <tr key={book.id} className={`${selectedBookID === book.id ? 'active' : ''} ${books ? 'fadeInRow' : 'hidden'}` } style={{ animationDelay: `${delay}ms` }}>
                <td onClick={ () => {filterBooks('Title', book.volumeInfo.title, book.id)} }> 
                {book.volumeInfo.title}
                </td>
                <td onClick={() => {filterBooks('Authors', book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : 'Unknown', book.id)}}>
                {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}
                </td>
                <td onClick={() => {filterBooks('Category', book.volumeInfo.categories ? book.volumeInfo.categories.join(", ") : 'Unknown', book.id)}}>
                {book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Unknown'}
                </td>
              </tr>)  
          
      })
    }

    return (
        <div className={`main-table__container` }>
          { loading ? <div className="main-table__loading">Loading...</div> : (
            <>
              <h1>Books</h1>
              {location.pathname === '/Books' ? null : <BreadCrumbs />}
                <table>
                  <thead>
                    <tr className="table__header">
                      <th>Title</th>
                      <th>Authors</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                {renderBooks()}
                    </tbody>
              </table>
            </>
          )}     
        </div>
    )
}