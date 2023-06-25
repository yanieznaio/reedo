import React from 'react'
import { styled } from 'styled-components'
import {AiFillDelete} from 'react-icons/ai'
import { useContext } from 'react'
import { StateContext } from '../context/StateProvider'
const BookGrid = (props) => {

    const {showBtnRemove} = useContext(StateContext)

    return (
        <>

        <BookContainer>

            {props.books.map(book => (
            <BookCard key={book._id}>
            {showBtnRemove && <BtnDelete onClick={() => props.handleRemove(book._id)}><AiFillDelete/></BtnDelete>} 
            <BookImg src={`http://localhost:3500/${book.imgUrl}`}/>
            <BookInfo>
                <BookTitle >{book.title}</BookTitle>
                <BookAuthor>{book.author}</BookAuthor>
            </BookInfo>
            </BookCard>
            ))}
            </BookContainer>
        </>
    )
}

export default BookGrid


const BookContainer = styled.div`
  display: grid;
  padding: 2%;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  height: 450px;
  overflow-y: auto;
    max-height: 70%;

  @media screen and (max-width: 900px){
    grid-template-columns: repeat(2, 1fr);
    height: 1000px;
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

const BtnDelete = styled.button`
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