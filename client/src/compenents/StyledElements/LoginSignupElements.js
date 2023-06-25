import { Link } from "react-router-dom"
import { styled } from "styled-components"
export const FormContainer = styled.div`
    width: 20%;
    max-width: 300px;
    padding: 4rem;
    margin: auto;
    margin-top: 5%;
    background: white;
    border-radius: 12px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

    @media screen and (max-width: 700px){
        width: 80%;
        padding: 2rem;
    }
`

export const Title = styled.h1`
    text-align: center;
    margin-bottom: 10%;
`

export const Form = styled.form`

    display: flex;
    flex-direction: column;
    gap: 10px;
  
`

export const Label = styled.label`
    display: none;

`

export const Input = styled.input`
    padding: 0.5rem;
    height: 2rem;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;


`
export const Button = styled.button`
    background: black;
    opacity: ${props => props.disabled? '0.5': '1'};
    color: white;
    cursor: pointer;
    height: 3rem;
    border-radius: 12px;
    margin-bottom: 5%;

`

export const SignupLink = styled(Link)`
    color: #3B44F6;
    text-decoration: none;
`

export const StyledError = styled.p`
    display: ${props => props.errmsg ? "block": "hidden"};

`
export const StyledInstructions = styled.p`
      display: ${props => props.display === "true" ? "block": "none"};
`