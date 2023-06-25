
import { useEffect, useState, useContext } from 'react';

import useAuth from '../../../services/auth/hooks/useAuth';
import { StateContext } from '../../../context/StateProvider';
import { styled } from 'styled-components';
import { fetchBooks, removeBook } from '../../../services/api/books';
import {AiFillDelete} from 'react-icons/ai'

const BooksList = ({selectedStatus}) => {
  const [books, setBooks] = useState([]);
  const {showBtnRemove, setShowBtnRemove} = useContext(StateContext)
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
    <BookContainer>

      {displayBooks.map(book => (
      <BookCard key={book._id}>
        {showBtnRemove && <BtnDelete onClick={() => handleRemove(book._id)}><AiFillDelete/></BtnDelete>}
        <BookImg src={`http://localhost:3500/${book.imgUrl}`}/>
        <BookInfo>
          <BookTitle >{book.title}</BookTitle>
          <BookAuthor>{book.author}</BookAuthor>
        </BookInfo>
      </BookCard>
    ))}
    </BookContainer>


  )
}

export default BooksList


const BookContainer = styled.div`
  display: grid;
  padding: 2%;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  overflow-y: auto;
  max-height: 70%;

  @media screen and (max-width: 900px){
    grid-template-columns: repeat(3, 1fr);
    height: 90%;
  }

`


const BookCard = styled.div`
display: flex;
flex-direction: column;

height: 200px;
border-radius: 20px;




`
const BookInfo = styled.div`
height: 50%;
color: white;


`
const BookTitle = styled.h2`
font-size: 1rem;
cursor: pointer;
`

const BookAuthor = styled.p`
  font-size: 0.8rem;
`

const BookImg = styled.img`
height: 100%;
width: 100%;
border-radius: 20px;

`
export const BtnDelete = styled.button`
  background: transparent;
  border: none;
  color: black;
 font-size: 1rem;
  border-radius: 50%;
  cursor: pointer;
  margin-left: auto;
  opacity: 0.7;
  &:hover{
    opacity: 1;
  }
`