
import { useEffect, useState, useContext } from 'react';
import useAuth from '../../../services/auth/hooks/useAuth';
import { StateContext } from '../../../context/StateProvider';
import { fetchBooks, removeBook } from '../../../services/api/books';
import BookGrid from '../../BookGrid';

const BooksList = ({selectedStatus}) => {
  const [books, setBooks] = useState([]);
  const {setShowBtnRemove} = useContext(StateContext)
  const { auth } = useAuth();

  const fetchData = async () => {
    try {
      const data = await fetchBooks(auth);
      setBooks(data);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  const handleRemove = async (bookId) => {
      try{
        await removeBook(bookId, auth).then(res => {
          fetchData()
          setShowBtnRemove(false)
        })

      } catch (err) {
        console.log(err)
      }
  }

  const displayBooks = selectedStatus !== null
  ? books.filter(book => book.status === selectedStatus)
  : books;

 
  return (
    <BookGrid books={displayBooks} handleRemove={handleRemove}/>
  )
}

export default BooksList


