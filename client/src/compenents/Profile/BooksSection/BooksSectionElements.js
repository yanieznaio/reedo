import { styled } from "styled-components"

export const Container = styled.div`
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

export const BtnWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  padding: 1rem;




`

export const Btn = styled.button`

  border: none;
  background: transparent;
  font-size: 2rem;
  border-radius:20px;
  text-align: center;
  cursor: pointer;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  &:hover{
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  }
  
  
`
export const BtnChangeView = styled.button`

  margin-right: auto;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 1rem;
  &:hover{
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  }



`


export const NavBarContainer = styled.div`
  display: flex;
  width: 60%;
  margin: auto;
  gap: 1px;
  margin-top: 3%;
  cursor: grab;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  border-radius: 20px;
  @media screen and (max-width: 900px){
    width: 90%;
  }



`

export const BtnBookByStatus = styled.button`
  border: none;
  background-color: transparent;

  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  padding: 1rem;
  font-size: 1rem;
  color: white;
  font-weight: 800;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  }



`