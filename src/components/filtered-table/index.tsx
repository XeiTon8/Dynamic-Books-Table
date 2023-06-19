import React from 'react';
import {GlobalAppContext} from '../../context/globalContext/MyAppContext'
import {BreadCrumbs} from '../breadcrumbs';
import { AdditionalInfo } from '../additional-Info';

interface FilteredTableProps {
    filteredBooks: any[]
}

export const FilteredTable: React.FC<FilteredTableProps> = ({ filteredBooks }) => {

    const {selectedBookID, setSelectedBookID} = React.useContext(GlobalAppContext)
    const [showFilteredRows, setShowFilteredRows] = React.useState(false);
    
    React.useEffect(() => {
        setShowFilteredRows(true)
    }, [])

    const handleRowClick = (id: string) => {
      setSelectedBookID!(id)
    }

    const renderFilteredBooks = () => {
        return filteredBooks.map((book, index) => {
          const delay = index * 100;
            return (
              <>
              <tr key={index} className={`${selectedBookID === book.id ? 'active' : ''} ${showFilteredRows ? 'fadeInRow' : ''}`} style={{ animationDelay: `${delay}ms` }}>
                <td onClick={ () => handleRowClick(book.id)}>
                  {book.volumeInfo.title}
                </td>
                <td onClick={ () => handleRowClick(book.id)}>
                  {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}
                </td>
                <td onClick={ () => handleRowClick(book.id)}>
                {book.volumeInfo.categories ? book.volumeInfo.categories.join(', ') : 'Unknown'}
                </td>
              </tr>
          <AdditionalInfo 
          bookID={book.id} 
          title={book.volumeInfo.title} 
          thumbnail={book.volumeInfo.imageLinks.thumbnail} 
          publishedDate={book.volumeInfo.publishedDate} 
          pageCount={book.volumeInfo.pageCount} 
          description={book.volumeInfo.description} 
          previewLink={book.volumeInfo.previewLink} 
          key={book.id}
          />
            
          </>
          )}
      )}

    return (
        <div className="filtered-table__container">
          <h2>Books</h2>
          <BreadCrumbs />
          <table>
          <thead>
            <tr>
              <th><span>Title</span></th>
              <th><span>Author</span></th>
              <th><span>Category</span></th>
            </tr>
          </thead>
          <tbody>
            {renderFilteredBooks()}
          </tbody>
          </table>
        </div>
    )
}
