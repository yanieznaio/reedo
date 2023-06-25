import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from 'react'
import axios from '../../services/api/axios'
import { Form, FormContainer, Input, Label, SignupLink, Title, StyledError, StyledInstructions, Button } from "../StyledElements/LoginSignupElements";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Register = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user)
        console.log(result)
        console.log(user)
        setValidName(result)

    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        console.log(result)
        console.log(pwd)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidMatch(match)

    }, [pwd, matchPwd])


    useEffect(() => {
        setErrMsg()

    }, [user, pwd, matchPwd])


    const handleSubmit = async (e) => {

        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("InvalidEntry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response.data);
            console.log(response.acessToken);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //cleat input fields

        }
        catch (err) {
            if (!err?.response) {
                setErrMsg('no Server Response');
            }
            else if (err.response?.status === 409) {
                setErrMsg('Username taken')

            }
            else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();

        }
    }


    return (
        <>

            {
                success ? (
                    <section>
                        <h1>success</h1>
                       
                    </section>
                ) : (
                    <FormContainer>
                        <StyledError ref={errRef} errormsg={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</StyledError>
                        <Title>Register</Title>
                        <Form onSubmit={handleSubmit}>
                            <Label htmlFor="usename">
                                Username:
                                <span className={validName ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validName || !user ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </Label>
                            <Input
                                type="text"
                                id="username"
                                ref={userRef}
                                placeholder="Username"
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uinote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                            />
                            <StyledInstructions id="uinote" display={userFocus && user && !validName ? "true" : "false"}>
                                <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                                4 to 24 charachers.<br />
                                Must begin with a letter. <br />
                                Letters, numbersm underscores, hyphens allowed.


                            </StyledInstructions>


                            <Label htmlFor="password">
                                password:
                                <span className={validPwd ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </Label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="Password"
                                onChange={(e) => setPwd(e.target.value)}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="uinote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <StyledInstructions id="uinote" display={pwdFocus && pwd && !validPwd ? "true": "false"}>
                                <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                                8 to 24 charachers.<br />
                                Must include uppercase and lowercase letters , a number and a special character. <br />
                                allowed special characters: <span arial-label="exclamation mark">!</span>
                                <span arial-label="at symbol">@</span><span aria-label="hashtag">#</span>
                                <span aria-label="dollar sign">$</span>
                                <span arial-label="percent">%</span>


                            </StyledInstructions>


                            <Label htmlFor="confirm_pwd">
                                Confirm password:
                                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </span>
                            </Label>
                            <Input
                                type="password"
                                id="confirm_pwd"
                                placeholder="Confirm Password"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <StyledInstructions id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                                Must match the first password input field.

                            </StyledInstructions>

                            <Button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign up</Button>

                        </Form>
                        <p>
                            Already registered?<br />
                            <span className="line">
                                {/*put router link here */}
                                <SignupLink to="/login">Sign in</SignupLink>
                            </span>
                        </p>
                    </FormContainer>)}

        </>
    )
}

export default Register
