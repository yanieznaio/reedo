import React, { useContext, useState } from 'react'
import { Container, BtnWrap, Btn, BtnChangeView, NavBarContainer, BtnBookByStatus } from './BooksSectionElements'
import AddBookForm from './AddBookForm'
import BooksList from './BooksList'
import { StateContext } from '../../../context/StateProvider'
import BookListTable from './BookListTable'
import ReviewsSection from './ReviewsSection'
import {AiFillDelete} from 'react-icons/ai'
import {BiBookAdd} from 'react-icons/bi'
const BooksSection = () => {
    const {showForm , setShowForm, showBtnRemove, setShowBtnRemove} = useContext(StateContext)
    const [changeView, setChangeView] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [showReviews, setShowReviews] = useState(false)
    const handleStatusChange = async (status) => {
      setSelectedStatus(status);
    
    };

    
  return (
    <div>

      <NavBarContainer>
        <BtnBookByStatus onClick={() => handleStatusChange(null)}>All</BtnBookByStatus>
        <BtnBookByStatus onClick={() => handleStatusChange("to read")}>To Read</BtnBookByStatus>
        <BtnBookByStatus onClick={() => handleStatusChange("finish")}>Finish</BtnBookByStatus>
        <BtnBookByStatus onClick={() => handleStatusChange("reading")}>Reading</BtnBookByStatus>
  
      </NavBarContainer>
      <Container>
        <BtnWrap>
          <BtnChangeView onClick={() => setChangeView(!changeView)}>Change view</BtnChangeView>
          <Btn onClick={() => setShowBtnRemove(!showBtnRemove)}><AiFillDelete/></Btn>
          <Btn onClick={() => setShowForm(!showForm)}><BiBookAdd/></Btn>
        </BtnWrap>
        { showForm && <AddBookForm/>}
        {!showForm && changeView && !showReviews && <BooksList  selectedStatus={selectedStatus}/>}
        {!changeView && !showForm && !showReviews &&  <BookListTable selectedStatus={selectedStatus}/>}

      </Container>
    </div>
  )
}

export default BooksSection
