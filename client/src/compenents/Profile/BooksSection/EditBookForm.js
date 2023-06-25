import React from 'react'
import { styled } from 'styled-components'
import { useState } from 'react'
import {AiFillCheckCircle} from 'react-icons/ai'
import useAuth from '../../../services/auth/hooks/useAuth'
import { fetchBooks, updateBook} from '../../../services/api/books'
const EditBookForm = ({id, currtitle, currauthor, currstatus, statusColor, setEditBook}) => {
    const {auth} = useAuth()
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        status: '',
       
      });

      const { author, title, status } = bookData;
    

      const handleChange = e => {
        
          setBookData({ ...bookData, [e.target.name]: e.target.value });
       
      };


    const getotherStatus = (currStatus) => {
        const status = ['finish', 'to read', 'reading']
        return status.filter(e => e !== currStatus)

    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (title === '' && author === '' && status === '') {
            setEditBook(false);
            return;
          }
      
          const updatedBookData = {
            title: title === '' ? currtitle : title,
            author: author === '' ? currauthor : author,
            status: status === '' ? currstatus : status,
          };
 
        try{
            const updatedBook = await updateBook(id, updatedBookData, auth)
            console.log("livre mis a jour", updatedBook)
        } catch (err){
            console.error(err)
        }
        setBookData({
          title: '',
          author: '',
          status: '',
       
        });


        setEditBook(false)
      
    
      };

  return (
    <>
   
        <Td>
      
            <Select
              name="status"
              value={status}
              onChange={handleChange}
              color={statusColor[status]}
            >
               
                <Option value={currstatus} color={statusColor[currstatus]}>{currstatus}</Option>
                <Option value={getotherStatus(currstatus)[0]} color={statusColor[getotherStatus(currstatus)[0]]}>{getotherStatus(currstatus)[0]}</Option>
                <Option value={getotherStatus(currstatus)[1]} color={statusColor[getotherStatus(currstatus)[1]]}>{getotherStatus(currstatus)[1]}</Option>
            </Select>
        </Td>
   
        <Td>
            <label></label>
            <Input placeholder={currtitle}
               type="text"
               id="title"
               name="title"
               value={title}
               onChange={handleChange}
               required
            ></Input>
        </Td>
        <Td>
             <label></label>
            <Input placeholder={currauthor}
             type="text"
             id="author"
             name="author"
             value={author}
             onChange={handleChange}
             required
            ></Input>
        </Td>
        <Td><BtnConfirm onClick={(e) => handleSubmit(e)}><AiFillCheckCircle/></BtnConfirm></Td>

    </>
  )
}

export default EditBookForm

const Td = styled.td`
padding: 12px 15px;
height: 3rem;



`
const Select = styled.select`
   -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
   
    border: none;
    outline: none;
    width: 6rem;
    height: 35px;
    padding: 5px 35px 5px 5px;
    font-size: 18px;
    background: ${props => props.color};
    border-radius: 5px;
    cursor: pointer;
`

const Option = styled.option`
  
    background: ${props => props.color};


`

const Input = styled.input`
    outline: none;
    border: none;

`

const BtnConfirm = styled.button`
background: none;
border: none;
color: #5F9DF7;
cursor: pointer;
opacity: 0.4;
font-size: 1.5rem;
transition: all 250ms ease-in-out;


&:hover{
    opacity: 1;
}

`