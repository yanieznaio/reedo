import React, { useContext,useState , useEffect} from 'react'
import AuthContext from '../../context/AuthProvider'
import {  useNavigate } from 'react-router-dom'
import BooksSection from './BooksSection/BooksSection'
import { styled } from 'styled-components'

import {MdPowerSettingsNew} from 'react-icons/md'
import {AiFillSetting} from 'react-icons/ai'
import {LiaUserCogSolid} from 'react-icons/lia'
import { fetchProfileImage } from '../../services/api/user'
import ProfileSettings from './ProfileSettings'
import useAuth from '../../services/auth/hooks/useAuth'
const UserHome = () => {
    const {setAuth} = useContext(AuthContext)
    const {auth} = useAuth()
    const navigate = useNavigate()
    const [profileImage, setProfileImage] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [showProfileSettings, setShowProfileSettings] = useState(false)
    const logout = () => {
        setAuth({})
        navigate('/')
    }
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
  return (

    <div>
      <SettingsContainer showSettings={showSettings}>
      <Button onClick={() => setShowSettings(!showSettings)}><AiFillSetting/></Button> 
      { showSettings && 
      <>
      <SettingsButton onClick={logout}><MdPowerSettingsNew/></SettingsButton> 
      <SettingsButton onClick={() => setShowProfileSettings(!showProfileSettings)} ><LiaUserCogSolid/></SettingsButton> 
      </>
      }
      </SettingsContainer>
      <ProfilImg  src={`http://localhost:3500/${profileImage}`}></ProfilImg>
     { showProfileSettings && <ProfileSettings></ProfileSettings>}

      {!showProfileSettings && <BooksSection></BooksSection>}


  


      {/* <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Mettre à jour</button>
      </form> */}
 

    </div>
  )
}

export default UserHome


const Button = styled.button`
 
  background: transparent;
  border: none;
  color: black;
  font-size: 2rem;

 
  cursor: pointer;
`

const ProfilImg = styled.img`
  position: absolute;
  top: 1rem;
  right: 2rem;
  height: 5rem;
  width: 5rem;
  background-color: aliceblue;
  border-radius: 50%;
  cursor: pointer;

`
const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  padding: 0.1%;
  top: 2rem;
  right: 8rem;
  gap: 2px;

  border-radius: 12px;

  box-shadow: ${props => props.showSettings ? 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset': 'none'};
  transition: all 0.2s ease-in;
`
const SettingsButton = styled(Button)`
   
   box-shadow:rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  border-radius: 12px;
  
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  }
`