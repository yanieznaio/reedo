import { useRef, useState, useEffect} from 'react';
import useAuth from '../../services/auth/hooks/useAuth';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from '../../services/api/axios';
import { Button, Form, FormContainer, Input, Label, SignupLink, Title } from '../StyledElements/LoginSignupElements';

const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
          
            setAuth({ user, pwd, roles, accessToken});
            setUser('');
            setPwd('');
            navigate(from, {replace: true})
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        
                <FormContainer>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <Title>Sign In</Title>
                    <Form onSubmit={handleSubmit}>
                        <Label htmlFor="username">Username:</Label>
                        <Input
                            type="text"
                            id="username"
                            placeholder='Username'
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <Label htmlFor="password">Password:</Label>
                        <Input
                            type="password"
                            placeholder='Password'
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <Button>Sign In</Button>
                    </Form>
                    <p>
                        Need an Account?{' '}
                        <span className="line">
                            {/*put router link here*/}
                            <SignupLink to="/register">Sign up</SignupLink>
                        </span>
                    </p>
                </FormContainer>
      
    )
}

export default Login