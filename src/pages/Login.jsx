import { useState } from 'react'
import styled from 'styled-components'
import { login } from '../redux/apiCalls'
import { useDispatch, useSelector } from 'react-redux'


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5),
   rgba(255, 255, 255, 0.5)
   ),
  url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") 
  center;

  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Wrapper = styled.div`
   width: 25%;
   padding: 20px;
   background-color: #fff;
`
const Title = styled.h1`
   font-size: 24px;
   font-weight: 400;
`
const Form = styled.form`
   display: flex;
   flex-direction: column;
`
const Input = styled.input`
   flex: 1;
   min-width: 40%;
   margin: 10px 0px;
   padding: 10px;
`
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: #fff;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
   color: green;
   cursor: not-allowed;
  }
`
const Link = styled.a`
     margin: 10px 0px;
     font-size: 14px;
     text-decoration: underline;
     cursor: pointer;
`
const  Error = styled.span`
   display: flex;
   align-items: center;
   justify-content: center;
   border-radius: 5px;
   height: 25px;
   background-color: #be0000;
   color: #fff;
`

const Login = () => {
         const [username, setUsername] = useState("")
         const [password, setPassword] = useState("")
         const dispatch = useDispatch()
         const {isFetching, error} = useSelector((state) => state.user)

         const handleLogin = (e) => {
            //preventDefault will help the login page not to refresh the page
              e.preventDefault()
              //login is from coming apiCalls in Redux folder
              login(dispatch, { username, password })
         }
     return (
         <Container>
              <Wrapper>
                   <Title>SIGN IN</Title>
                   <Form>
                        <Input placeholder="username" 
                        onChange={(e) => setUsername(e.target.value)} />
                         <Input placeholder="password" 
                         type="password"
                         onChange={(e) => setPassword(e.target.value)} />

                           {/* isFetching will be useful here below with a condition apply to it */}
                     <Button onClick={handleLogin} disabled={isFetching}>LOGIN</Button>

                      {error && <Error>Something went wrong...</Error>}

                     <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
                      <Link>CREATE AN ACCOUNT</Link>
                   </Form>
              </Wrapper>
          </Container>
     )
}

export default Login