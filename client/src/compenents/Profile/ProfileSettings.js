import React, { useEffect } from 'react'
import { Container, NavBarContainer } from './BooksSection/BooksSectionElements'
import { styled } from 'styled-components'
import { fetchProfileImage, uploadProfileImage } from '../../services/api/user'
import { useState } from 'react';
import useAuth from '../../services/auth/hooks/useAuth';
const ProfileSettings = () => {
    const [profileImage, setProfileImage] = useState('');
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

    fetchImage()

  }, [])

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadProfileImage(file, auth);
    
      fetchImage(imageUrl)
    } catch (error) {
      console.error(error);
      // Gérer les erreurs de téléchargement de l'image
    }
  };
  return (
    <>
    <NavBarContainer>
        <Title>Settings</Title>
    </NavBarContainer>
    <Container>
      <SettingsContainer>
      <Aside>
          <LinkContainer>
          <LinkSettings>Profile</LinkSettings>
          </LinkContainer>
          <LinkContainer>
          <LinkSettings>Security</LinkSettings>
          </LinkContainer>
          <LinkContainer>
          <LinkSettings>Theme</LinkSettings>
          </LinkContainer>
      
     

      </Aside>
      <Content>
      <Profile>
            <p>Profile Picture</p>
              <ProfileImg src={`http://localhost:3500/${profileImage}`} />
              <Label for="file-upload" class="custom-file-upload">
                Change Image
            </Label>
          <FileInput id="file-upload" type="file" accept="image/*" onChange={handleImageUpload} />
        </Profile>
        <Info>
          <div>
          <h4>your username</h4>
          <p>g389283</p>
          </div>
          <Button>Edit username</Button>

        </Info> 
        <Info>
          <div>
          <h4>MenberShip</h4>
          <p>Basic</p>
          </div>
          <Button>Change MenberShip</Button>

        </Info>

      </Content>
      </SettingsContainer>
     
     
    </Container>
 
    </>
  )
}

export default ProfileSettings

export const SettingsContainer = styled.div`
display: flex;
height: 100%;


`
const Title = styled.h4`
    color: white;
    margin-left: 1rem;
`

const Profile = styled.div`
margin: auto;
height: 50%;
display: flex;
flex-direction: column;
justify-content: center;
gap: 5px;
align-items: center;
color: gray;



`

const Label = styled.label`
  cursor: pointer;
  border: 2px solid darkgray;
  color: darkgray;
  width: 10rem;
  height: 2rem;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  font-size: 0.7rem;
  transition: all 250ms ease-in-out;
  &:hover{
    background-color: #5F9DF7;
    color: white;
    border: 2px solid #5F9DF7;

  }
  ;
`
const FileInput = styled.input`
  background: black;
  color: white;
  display: none;
`

const ProfileImg = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border: 3px solid #5F9DF7;
    @media screen and (max-width: 900px){
        margin: auto;
    }
  

`

const Aside = styled.div`
width: 30%;
display: flex;
flex-direction: column;
gap: 1rem;
height: 100%;
color: gray;
font-weight: 600;
padding-top: 3rem;


justify-content: flex-start;
align-items: center;
`
const Content = styled.div`
width: 80%;
display: flex;
flex-direction: column;
background-color: #F1F6F9;
margin-bottom: 5px;
margin-right: 5px;
border-top-right-radius: 20px;
border-bottom-right-radius: 20px;
`

const Info = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 3rem;
color: gray;
`

const LinkSettings = styled.a`
cursor: pointer;







`
const Button = styled.button`
  background: transparent;
  border: 2px solid darkgray;
  border-radius: 30px;
  height: 2rem;
  width: 10rem;
  color: darkgray;
  font-weight: 600;
  cursor: pointer;
  transition: all 250ms ease-in-out;
  &:hover{
    
    color: #5F9DF7;
    border: 2px solid #5F9DF7;

  }
`


const LinkContainer = styled.div`
width: 100%;
font-size: 1rem;
height: 50px;
box-sizing: border-box;
-moz-box-sizing: border-box;
-webkit-box-sizing: border-box;
display: flex;
padding-left: 2rem;
align-items: center;
&:hover{
  color: black;
  border-left: 5px solid #5F9DF7;
  
}
`