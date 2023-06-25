import React from 'react'
import { styled } from 'styled-components'
import {AiFillStar} from 'react-icons/ai'
const ReviewsSection = () => {

const reviews = [
    {
        title: "Un palais de roses et d'épines",
        author: 'sarah j maas',
        img:"https://static.fnac-static.com/multimedia/Images/FR/NR/f6/97/80/8427510/1507-1/tsp20221112072650/Un-Palais-d-epines-et-de-roses.jpg",
        review: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system",
        score: 5
    },
    {
        title: "Un palais de flamme et d'argent",
        author: 'sarah j maas',
        img:"https://products-images.di-static.com/image/sarah-j-maas-un-palais-d-epines-et-de-roses-tome-4-un-palais-de-glace-et-de-lumiere/9782732490762-475x500-1.jpg",
        review: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system",
        score: 4
    },
    {
        title: "Un palais de brume",
        author: 'sarah j maas',
        img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaAG3v1Fzv8Nshy1C_2tomfW1UhVky5y8tUjdaNzlipBPkyu9Dt_10dsWTLH--Qo_ttck&usqp=CAU",
        review: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system",
        score: 3
    },
    {
        title: "Un palais de glaces",
        author: 'sarah j maas',
        img: "https://products-images.di-static.com/image/sarah-j-maas-un-palais-d-epines-et-de-roses-tome-3-un-palais-de-cendres-et-de-ruines/9782732488806-475x500-1.jpg",
        review: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system",
        score: 5
    },
      {
        title: "Un palais de flamme et d'argent",
        author: 'sarah j maas',
        img: "https://products-images.di-static.com/image/sarah-j-maas-un-palais-d-epines-et-de-roses-tome-4-un-palais-de-glace-et-de-lumiere/9782732490762-475x500-1.jpg",
        review: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system",
        score: 4
    },
    {
        title: "Un palais de brume",
        
        author: 'sarah j maas',
        img: "https://products-images.di-static.com/image/sarah-j-maas-un-palais-d-epines-et-de-roses-tome-2-un-palais-de-colere-et-de-brume/9782732485218-475x500-1.jpg", 
        review: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system",
        score: 3
    },
    {
        title: "Un palais de glaces",

        author: 'sarah j maas',
        img: "https://products-images.di-static.com/image/sarah-j-maas-un-palais-d-epines-et-de-roses-tome-4-un-palais-de-glace-et-de-lumiere/9782732490762-475x500-1.jpg",
        review: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system",
        score: 5
    }
  
]
  return (
    <ReviewsContainer>
      {reviews.map((review, i )=> (
        <ReviewCard>
            <CardHead>
            <BookInfo>
            
            <ReviewTitle>{review.title}</ReviewTitle>
            <ReviewAuthor>{review.author}</ReviewAuthor>
           
            </BookInfo>
            <ReviewImg src={review.img}></ReviewImg>
            </CardHead>

         
            {Array.from(Array(review.score), (e, i) => {
              return <AiFillStar style={{color: "#F9D949", fontSize:"1.5rem"}}/>
            })}

            <Review>{review.review}</Review>
          

        </ReviewCard>
      ) )}
    </ReviewsContainer>
  )
}

export default ReviewsSection


const ReviewsContainer = styled.div`
      display: grid;
  padding: 2%;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  overflow-y: auto;
  max-height: 70%;

  @media screen and (max-width: 900px){
    grid-template-columns: repeat(1, 1fr);
    height: 90%;
  }
`


const ReviewCard = styled.div`
background-color: #F1F6F9;

height: 300px;
padding: 2rem 1rem;
`

const CardHead = styled.div`
display: flex;
`

const BookInfo = styled.div`

`
const ReviewImg = styled.img`
width: 120px;
height: 120px;

margin-left: auto;
border-radius: 5px;


`
const ReviewTitle = styled.h2`
    font-size: 1rem;


`

const ReviewAuthor = styled.p`
font-size: 0.7rem;
`

const ReviewScore = styled.div`

`

const Review = styled.p`
letter-spacing: 1px;
line-height: 2rem;

`
