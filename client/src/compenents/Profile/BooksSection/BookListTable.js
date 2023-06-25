import React from 'react'
import { useState, useEffect } from 'react';
import useAuth from '../../../services/auth/hooks/useAuth';
import { styled } from 'styled-components';
import { fetchBooks } from '../../../services/api/books';
import EditBookForm from './EditBookForm';
import {GrEdit} from 'react-icons/gr'
const BookListTable = ({selectedStatus}) => {

  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(false)
  const statuColor = {
    'finish': 'rgb(174, 226, 255, 0.5)',
    'to read': 'rgb(241, 225, 166, 0.5)',
    'reading': 'rgb(254, 222, 255, 0.5)'
  }
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

  const displayBooks = selectedStatus !== null
  ? books.filter(book => book.status === selectedStatus)
  : books;

  const handleClick = (bookId) => {
    setEditBook(bookId)
  }



  return (

    <TableContainer>

    <Table>
      <Thead>
        <Tr>
          <Th>status</Th>
          <Th>Title</Th>
          <Th>author</Th>
        </Tr>
      </Thead>
      <Tbody>
        {displayBooks.map(book => (
          <Tr key={book._id} boxshadow={editBook === book._id}>
            {editBook === book._id ?
            
            <>
              <EditBookForm id={book._id} currtitle={book.title} currauthor={book.author} currstatus={book.status} statusColor={statuColor} setEditBook={setEditBook}/>
            </>
            
            : 
            
            <>
            <td><Status color={statuColor[book.status]}>{book.status}</Status> 
            </td>
            <Td>{book.title}</Td>
            <Td>{book.author}</Td>
            <Td><EditBtn onClick={() => handleClick(book._id)}><GrEdit/></EditBtn></Td>
            </>
            }

          </Tr>
        ))}
     
      </Tbody>
     
    </Table>
 
    </TableContainer>
  )
}

export default BookListTable


const TableContainer = styled.div`
  height: 350px;
  overflow-y: scroll;
  @media screen and (max-width: 900px){
    height: 800px;
    
  }


`
const Table = styled.table`
border-collapse: collapse;
width: 80%;
margin: auto;

font-size: 0.9em;
font-family: sans-serif;
min-width: 400px;


`
const Thead = styled.thead`
 
    color: black;
    text-align: left;
   
`
const Tbody = styled.tbody`
    border-bottom: 1px solid #dddddd;
`

const Tr = styled.tr`
    border-bottom: 1px solid #dddddd;
    box-shadow:${props => props.boxshadow ?  'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;': 'none'};
    transition: all 250ms ease-in-out;

`

const Td = styled.td`
padding: 12px 15px;
cursor: pointer;


`
const Th = styled.th`
padding: 12px 15px;


`

export  const Status = styled.p`
    background-color:${props => props.color};
    padding: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
    width:5rem;


`

const EditBtn = styled.button`
  color: grey;
  opacity: 0.1;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 250ms ease-in-out;
  &:hover{
    opacity: 1;
  }
`