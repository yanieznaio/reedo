import React from 'react'
import { useState, useContext } from 'react';
import { styled } from 'styled-components'
import useAuth from '../../../services/auth/hooks/useAuth';
import { StateContext } from '../../../context/StateProvider'
import { addNewBook } from '../../../services/api/books';
import {FaRegWindowClose} from 'react-icons/fa'
import {CgCloseR} from 'react-icons/cg'
const AddBookForm = () => {
  const { auth } = useAuth();
  const { setShowForm} = useContext(StateContext)
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    status: '',
    imgUrl: null
  });
  const { author, title, status, imgUrl } = bookData;

  const handleChange = e => {
    if (e.target.name === 'imgUrl') {
      setBookData({ ...bookData, [e.target.name]: e.target.files[0] });
    } else {
      setBookData({ ...bookData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth || !auth.accessToken) {
      return;
    }
    const bookDataTosend = new FormData();
    bookDataTosend.append('author', author);
    bookDataTosend.append('title', title);
    bookDataTosend.append('status', status);
    if (imgUrl) {

      bookDataTosend.append('imgUrl', imgUrl);
    }
    addNewBook(auth, bookDataTosend)
    setBookData({
      title: '',
      author: '',
      status: '',
      imgUrl: null
    });
    setShowForm(false)

  };
  return (
    <div>
        <FormContainer onSubmit={handleSubmit} encType="multipart/form-data">
            
            <Closebtn onClick={() => setShowForm(false)}><FaRegWindowClose/></Closebtn>
            <Form>
              <Title>Add a book</Title>
              <InputContainer>
                <Label htmlFor='title'></Label>
                <Input 
                      type="text"
                      id="title"
                      name="title"
                      value={title}
                      onChange={handleChange}
                      required
                  ></Input>
                
              </InputContainer>
              <InputContainer>
                 <Label htmlFor='author'></Label>
                <Input 
                 type="text"
                 id="author"
                 name="author"
                 value={author}
                 onChange={handleChange}
                 required
                ></Input>
                
              </InputContainer>
              <InputContainer>
                <Label htmlFor='status'></Label>
                <select  id="status"
                  name="status"
                  value={status}
                  onChange={handleChange}
                  required>
                  <option value="">--statut--</option>
                  <option value='to read'>To Read</option>
                  <option value='reading'>Reading</option>
                  <option value='finish'>Finish</option>

                </select>
              </InputContainer>
              <InputContainer>
                 <Label htmlFor='imgUrl'></Label>
                  <InputFile    
                    type="file"
                    id="imgUrl"
                    name="imgUrl"
                    onChange={handleChange}></InputFile>
              </InputContainer>

              <InputContainer>
           
                <BtnAdd type='submit'>Add</BtnAdd>
              </InputContainer>
            
           
            </Form>
          </FormContainer>
    </div>
  )
}

export default AddBookForm

const FormContainer = styled.form`

  border-radius: 20px;
  height: 60%;
  width: 40%;
  margin: auto;
  padding: 1rem;
  background: #F0F0F0;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  @media screen and (max-width: 700px){
    width: 80%;
    height: 30%;
  }
`

const Closebtn = styled.button`
  display: block;
  margin-left: auto;
  border: none;

  background: transparent;
  font-size: 2rem;
  cursor: pointer;
`

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;


`
const Input = styled.input`
  width: 8rem;
  text-decoration: none;
  padding: 0.5rem;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border: none;
  border-radius: 20px;
  &:focus{
    outline:none;
  }
`

const Label = styled.label`


`

const InputContainer = styled.div`

`

const BtnAdd = styled.button`
  background-color: black;
  color: white;
  border-radius: 20px;
  padding: 0.5rem;
  width: 100%;
  cursor: pointer;

`

const Title = styled.p`

`

const InputFile = styled.input`
  width: 9rem;

`