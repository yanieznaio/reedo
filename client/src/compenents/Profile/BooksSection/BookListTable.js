import React from 'react'
import { useState, useEffect } from 'react';
import useAuth from '../../../services/auth/hooks/useAuth';
import { fetchBooks } from '../../../services/api/books';
import BookTable from '../../BookTable';
const BookListTable = ({selectedStatus}) => {

  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(false)
  const { auth } = useAuth();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBooks(auth);
        setBooks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [auth, editBook]);




  const handleClick = (bookId) => {
    setEditBook(bookId)
  }

  
  return (
    <BookTable books={books} selectedStatus={selectedStatus} handleClick={handleClick} setEditBook={setEditBook} editBook={editBook}/>
  )
}

export default BookListTable


