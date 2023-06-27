import { Link, Outlet, useLocation  } from "react-router-dom";
import { useState, useEffect, } from "react";
import { styled } from "styled-components";
import useAuth from "../services/auth/hooks/useAuth";
import { FlexRowContainer } from '../compenents/StyledElements/StyledContainers'
import {BiSearch} from 'react-icons/bi'
import { fetchProfileImage } from "../services/api/user";
import axios from "../services/api/axios";
import {RiUserSearchLine} from 'react-icons/ri'
const Layout = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [showInputSearch, setShowInputSearch] = useState(false)
  const {auth} = useAuth()


  const fetchImage = async() =>{
 
      try {
        const imgUrl = await fetchProfileImage(auth)
    
        setProfileImage(imgUrl)
      }catch (err) {
        console.error(err)
      }
    

   
  }
  useEffect(() => {
    if(Object.keys(auth).length !== 0){
      fetchImage()
    }
 

  }, [auth])
  const handleSearch = async (term) => {
    setSearchTerm(term);

    try {

      const response = await axios.get(`/users/search?q=${term}`);
      const data = response.data;
 
      setSuggestions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const resetSuggestions = () => {
    setSuggestions([]);
    setSearchTerm('')
  };

  useEffect(() => {
    resetSuggestions();
    setShowInputSearch(false)
  }, [location]); // Réinitialiser les suggestions lorsque la location change

  const handleClick=(e) => {
    e.preventDefault()
    setShowInputSearch(true)
  }
  return (
    <LayoutContainer>
       <FlexRowContainer>
        <StyledLink to="/">REEDO</StyledLink>
        
        

        <FormContainer>
      <SearchBtn onClick={(e) => handleClick(e)} display={showInputSearch? 'none' : 'block'}><RiUserSearchLine/></SearchBtn>
        
      <Input

        type="text"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search users..."
        roundborder={suggestions.length > 0 && searchTerm.length > 0? 'true': 'false'}
        display={showInputSearch? 'block' : 'none'}
      />
      {suggestions.length > 0 && searchTerm.length > 0 && (
        <Ul>
          {suggestions.map((user) => (
          <Li key={user._id}>
            <UserLink to={`/profile/${user.username}`} onClick={resetSuggestions}><Img src={user.profileImage ? `http://localhost:3500/${user.profileImage}` : "https://static.vecteezy.com/ti/vecteur-libre/p3/5544718-profil-icone-design-vecteur-gratuit-vectoriel.jpg"}/>{user.username}</UserLink>
          </Li>
        ))}
        </Ul>
      )}
    </FormContainer>
    {auth && profileImage &&(
      <>
      <Link to="/"><UserImage  src={`http://localhost:3500/${profileImage}`}></UserImage></Link>
      </>
    )
    }
      </FlexRowContainer>
      <Outlet/>
    </LayoutContainer>
  )
}

export default Layout


const LayoutContainer = styled.div`
 
`

const StyledLink = styled(Link)`
text-decoration: none;
color: black;
font-size: 2rem;
font-weight: 600;

`

const UserLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: gray;
  font-weight: 500;

  &:hover{
    color: black;
  }


`
const FormContainer = styled.form`
    margin-right: 5rem;
    margin-left: auto;

  position: relative;

`
const SearchBtn = styled.button`
  
  background: transparent;


 color:  rgb(127, 132, 135);
 font-size: 2rem;
 border: 1px solid  rgb(127, 132, 135, 0.3);
 cursor: pointer;
 border-radius: 12px;
 width: 3rem;
 height: 3rem;
 display: flex;
 justify-content: center;
 align-items: center;
 display: none;
 &:hover{
   background: rgb(255,255,255, 0.2);
 }
 @media screen and (max-width: 900px){
    display: ${props => props.display };
  }
`

const Label = styled.label`
  position: absolute;
  cursor: text;

  

`

const Input = styled.input`
  outline: none;
  border: none;
  border-radius: 12px;

  border-bottom-left-radius: ${props => props.roundborder === 'true'? '0px': '12px'};
  border-bottom-right-radius: ${props => props.roundborder === 'true'? '0px': '12px'};
  background:rgb(255,255,255);

  
  height: 2.5rem;
  width: 15rem;
  @media screen and (max-width: 900px){
    display: ${props => props.display};
  }
  
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

const UserImage = styled.img`

  height: 3rem;
  width: 3rem;
  background-color: aliceblue;
  border-radius: 50%;
  cursor: pointer;
`