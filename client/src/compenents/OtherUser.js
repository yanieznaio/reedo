import React from 'react'
import { Container } from './Profile/BooksSection/BooksSectionElements'
import { styled } from 'styled-components'

const OtherUser = () => {
    console.log("other user")
  return (
    <OtherUserContainer id="otherUser">
        <p>hssk</p>
        <Container>
                <h1>other user</h1>
        </Container>
    </OtherUserContainer>

  )
}

export default OtherUser

const OtherUserContainer = styled.div`

  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  width: 60%;
  height: 500px;
  background-color: white;
  border-radius: 20px;
  margin: auto;


  @media screen and (max-width: 900px){
    width: 90%;
    height: 1000px;

  }




`