import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from '../services/api/axios';
import { BtnBookByStatus, NavBarContainer } from './Profile/BooksSection/BooksSectionElements';
import BookGrid from './BookGrid';


const UserProfile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Effectuez une requête pour récupérer les informations du profil de l'utilisateur à l'aide du nom d'utilisateur
        const response = await axios.get(`/users/profile/${username}`);
        const userData = response.data;
        console.log(userData.boo)
        setUserData(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, [username]);


  if (!userData) {
    return <div>Loading...</div>;
  }


  return (
  <>
  <NavBarContainer>
  <BtnBookByStatus>Profile</BtnBookByStatus>
  <BtnBookByStatus>Books</BtnBookByStatus>


  </NavBarContainer>
   <OtherUserContainer>
    <Head>
      <Info>
      <UserImg src={userData.profileImage ? `http://localhost:3500/${userData.profileImage}` : "https://as1.ftcdn.net/v2/jpg/00/64/67/52/1000_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD.jpg"}/>
      <Username>{userData.username}</Username>

      </Info>


    </Head>
    <Content>
 {    <div>

      {userData.books ? (
        <BookGrid books={userData.books}/>
      ) : (
        <p>No books found</p>
      )}
    </div> }
    </Content>
   </OtherUserContainer>
    </>
 
  );
};

export default UserProfile;


const OtherUserContainer = styled.div`

  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  width: 60%;
  height: 500px;
  background-color: white;
  border-radius: 20px;
  margin: auto;
  display: flex;



  @media screen and (max-width: 900px){
    width: 90%;
    height: 1000px;

  }
`

 const Head = styled.div`
   padding: 2rem 1rem ;
   display: flex;
   flex-direction: column;

  width: 20%;
  align-items: center;
 `
 const Info  = styled.div`
 
 `

 const UserImg = styled.img`
 width: 100px;
 height: 100px;
 border-radius: 50%;
 border: 1px solid white;
 box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
 `

 const Username = styled.p`
 text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 1px;
  color: #2D4356;
 
 `

 const Content = styled.div`
  width: 80%;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  height: 100%;
  margin: auto;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
 `