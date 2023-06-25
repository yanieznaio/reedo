import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { styled } from "styled-components";

import { FlexRowContainer } from '../compenents/StyledElements/StyledContainers'
import {BiSearch} from 'react-icons/bi'
import axios from "../services/api/axios";
const Layout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (term) => {
    setSearchTerm(term);

    try {

      const response = await axios.get(`/users/search?q=${term}`);
      const data = response.data;
      console.log(data)
      setSuggestions(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <LayoutContainer>
       <FlexRowContainer>
        <h1>REEDO</h1>
        

   
          
        <FormContainer>
      <Input

        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search users..."
        roundborder={suggestions.length === 0}
      />
      {suggestions.length > 0 && searchTerm.length > 0 && (
        <Ul>
          {suggestions.map((user) => (
            <Li key={user._id}>
                <Img src={user.profileImage ? `http://localhost:3500/${user.profileImage}` : "https://i.pinimg.com/236x/eb/bb/b4/ebbbb41de744b5ee43107b25bd27c753.jpg"} ></Img>
              {user.username}
          
            </Li>

          ))}
        </Ul>
      )}
    </FormContainer>
      </FlexRowContainer>
      <Outlet/>
    </LayoutContainer>
  )
}

export default Layout


const LayoutContainer = styled.div`
 
`

const FormContainer = styled.form`
  margin-right: 10rem;
  position: relative;

`


const Label = styled.label`
  position: absolute;
  cursor: text;
  padding: 0.5rem;
  

`

const Input = styled.input`
  outline: none;
  border: none;

 background: rgb(255,255,255, 0.9);
  height: 2rem;
  width: 15rem;
  
`
const Ul = styled.ul`
background: 	rgb(255,255,255);

margin-top: 0;
position: absolute;
width: 100%;
list-style: none;
padding: 0;
border-bottom-left-radius: 20px;
border-bottom-right-radius: 20px;
box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

`

const Li = styled.li`
  margin-left: 0px;
  list-style: none;
  cursor: pointer;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: gray;

  &:hover{
    color: black;
  }


`

const Img = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;


`