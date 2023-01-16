import styled from "styled-components"

import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";

//SignIn /SignUp Page
const SignIn = () => {
    const navigate=useNavigate();
    const [users,setUsers]=useState(null);
    const [isSignUp, setIsSignUp] = useState(false)
    const [hidden,setHidden]=useState(true);
    const [hidden2,setHidden2]=useState(true);
    const [fail, setFail] = useState(false);

    const [formState, setFormState] = useState({
        isSignUp: isSignUp,
        formData: {
            userName: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            address: '',
        }
    })
    const forgotPass = () => {
        setFail(!fail);
    }


    useEffect(()=>{
        fetch(`/api/users`)
        .then((res)=> res.json())
        .then((data)=>{
            setUsers(data.data);
        })
    }, [])

    //handleSubmit checks if the username and password are correct then signs in the user ,otherwise it shows an error message
    const handleSubmit = () => {
        Object.values(users).map((user)=>{
            if(user.userName==formState.formData.userName&&user.password==formState.formData.password){
                window.localStorage.setItem("user",formState.formData.userName);
                navigate("/Home");
                window.location.reload();
            }
        })
        setHidden(false);
        
    }

    //handleSubmit2 checks if the signup form inputs are valid and signs up the user
    const handleSubmit2=()=>{
        if(formState.formData.password!==formState.formData.confirmPassword){
            setHidden2(false);
        }
        else{
            fetch("/api/user",{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formState.formData)
                
            })
            .then(res=>res.json())
            .then((data)=>{
            })
            
            //TOOK CATCH CAUSE CREATE ERROR 
            // .catch((error)=>{
            //     window.alert(error);
            // })
            window.localStorage.setItem("user",formState.formData.userName);
            navigate("/Home");
            window.location.reload();
        }
    }

    //handleSignUpOptionButton toggles between if the user wants to sign in or sign up
    const handleSignUpOptionButton = (e) => {
        e.preventDefault()
        setIsSignUp(state => !state)
    }

    //handleInput handleInput handles the changes to the form
    const handleInput = (e) => {
        const field = e.target.name;
        const val = e.target.value;
        const temp = {...formState}
        temp.formData[field] = val
        setFormState(temp)
    }
    return (
        <SignInPageWrapper>
            <FormSection>
                {
                    isSignUp 
                    ? 
                    <FormFloat>
                        <FormTitleDiv>
                            <p>Sign up</p>
                        </FormTitleDiv>

                        <Underline/>

                        <FormStyle >
                            <FormInputsSignUpDiv>
                                <Col>
                                    <SignUpFormDiv>
                                        <label htmlFor="userName">User Name</label>
                                        <input value={formState.formData.userName} onChange={handleInput} placeholder="Insert username..." id="userName" name="userName"></input>
                                    </SignUpFormDiv>
                                    <SignUpFormDiv>
                                        <label htmlFor="Password">Password</label>
                                        <input value={formState.formData.password} onChange={handleInput} placeholder="Insert password..." id="Password" type="password" name="password"></input>
                                    </SignUpFormDiv>
                                    <SignUpFormDiv>
                                        <label htmlFor="confirmPassoword">Confirm Password</label>
                                        <input value={formState.formData.confirmPassword} onChange={handleInput} placeholder="Confirm username..." type="password" id="confirmPassoword" name="confirmPassword"></input>
                                    </SignUpFormDiv>
                                    <SignUpFormDiv>
                                        <label htmlFor="email">Email</label>
                                        <input value={formState.formData.email} onChange={handleInput} placeholder="Insert email..." type='email' id="email" name="email"></input>
                                    </SignUpFormDiv>
                                </Col>
                                <Col>
                                    <SignUpFormDiv>
                                        <label htmlFor="firstName">First Name</label>
                                        <input value={formState.formData.firstName} onChange={handleInput} placeholder="Insert First Name..." type='firstName' id="firstName" name="firstName"></input>
                                    </SignUpFormDiv>
                                    <SignUpFormDiv>
                                        <label htmlFor="lastName">Last Name</label>
                                        <input value={formState.formData.lastName} onChange={handleInput} placeholder="Insert Last Name..." type='lastName' id="lastName" name="lastName"></input>
                                    </SignUpFormDiv>
                                    <SignUpFormDiv>
                                        <label htmlFor="phone">Phone Number</label>
                                        <input value={formState.formData.phone} onChange={handleInput} placeholder="Insert Phone Number..." id="phone" name="phone"></input>
                                    </SignUpFormDiv>
                                    <SignUpFormDiv>
                                        <label htmlFor="address">Address</label>
                                        <input value={formState.formData.address} onChange={handleInput} placeholder="Insert Address..." id="address" name="address"></input>
                                    </SignUpFormDiv>
                                </Col>
                            </FormInputsSignUpDiv>
                            <FormSubmitButton type="submit" onClick={handleSubmit2}>Join</FormSubmitButton>
                            <ErrorMessage style={{visibility:hidden2?"hidden":"visible"}}>Password and Confirm Password do not match!</ErrorMessage>
                        </FormStyle>
                        <SignUpOption>
                            <a onClick={handleSignUpOptionButton} href="">Already have an account?</a>
                        </SignUpOption>
                    </FormFloat>
                    :
                    <FormFloat>

                    {/*  --- THIS IS SIGN IN ---  */}
                    <FormTitleDiv>
                        <p>Sign in</p>
                    </FormTitleDiv>

                    <Underline/>

                    <FormStyle >
                        <FormInputsDiv>
                            <SignInFormDiv>
                                <label htmlFor="userName">Username</label>
                                <input value={formState.formData.userName} onChange={handleInput} id="userName" name="userName" placeholder="Insert username..."></input>
                            </SignInFormDiv>
                            <SignInFormDiv>
                                <label htmlFor="password">Password</label>
                                <input value={formState.formData.password} onChange={handleInput} id="password" name="password" placeholder="Insert password..." type="password"></input>
                            </SignInFormDiv>
                        </FormInputsDiv>
                        <FormSubmitButton onClick={handleSubmit}>Enter</FormSubmitButton>
                    </FormStyle>
                    <ErrorMessage style={{visibility:hidden?"hidden":"visible"}}>Invalid Username/Password</ErrorMessage>
                    <SignUpOption>
                        <a onClick={handleSignUpOptionButton} href="">Sign-up</a>
                    </SignUpOption>

                        <Button onClick={forgotPass}>Forgot password ?</Button>
                        {fail && <NiceMessage>Too bad</NiceMessage>}

                </FormFloat>
                }
            </FormSection>
        </SignInPageWrapper>
    )

}

//--- styling ---
const Col = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 40px;
`
const NiceMessage = styled.div`
color: red;
padding: 1rem 0;
display: flex;
`
const Button = styled.button`
    font-size: 16px;
    margin-top: 1rem;
    background: #162c35;
    color: white;
    border: none;
    cursor: pointer;
    height: 40px;
    padding: 0;

    &:hover{
        color: gray;
    }

`
const SignUpFormDiv = styled.div`
    display:flex;
    flex-direction: column;
    margin-right: 5px;
    margin-top: 10px;
    label{
        margin-bottom: 5px;
        border-radius: 20px;
    }
    input{
        color: white;
        font-size: 16px;
        padding: 0.5rem;
        width: 15rem;
        height: 3rem;
        border: none;
        border-radius: 10px;
        background: #162c35;
        box-shadow: inset 5px 5px 10px #11232a, 
                    inset -5px -5px 10px #1b3540;
        outline: none;
        
    }
`
const Underline = styled.div`
    height: 1px;
    background-color: white;
    opacity: 10%;
    margin-bottom: 15px;
    margin-top: 10px;
    margin-right: 5px;
`
const FormInputsSignUpDiv = styled.div`
    width: 500px;
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
`
const FormInputsDiv = styled.div`
display: flex;
width: 500px;
`

const FormSubmitButton = styled.button`
margin-top: 2rem;
display: flex;
gap: 1rem;
justify-content: center;
align-items: center;
align-self: center;
border-radius: 10px;
background: #162c35;
box-shadow:  5px 5px 10px #11232a,
            -5px -5px 10px #1b3540;
color: white;
border: none;
cursor: pointer;
height: 3rem;
width: 40%;

&:hover{
    color: gray;
}

&.active {
    color: gray;
    border-radius: 10px;
    background: #162c35;
    box-shadow: inset 5px 5px 10px #11232a,
            inset -5px -5px 10px #1b3540;
}
`
const FormFloat = styled.div`
`
const FormTitleDiv = styled.div`
    margin-top: 40%;
    width: 100%;
    font-size: 22px;
    font-weight: bold;
`
const SignUpOption = styled.div`
    margin-top: 25px;
    display: flex;

`
const SignInFormDiv = styled.div`
    display:flex;
    flex-direction: column;
    margin-right: 20px;
    label{
        margin-bottom: 5px;
    }
    input{
        color: white;
        font-size: 16px;
        padding: 0.5rem;
        width: 15rem;
        height: 3rem;
        border: none;
        border-radius: 10px;
        background: #162c35;
        box-shadow: inset 5px 5px 10px #11232a, 
                    inset -5px -5px 10px #1b3540;
        outline: none;
    }
`
const FormStyle = styled.div`
    display: flex;
    flex-direction: column;

`
const SignInPageWrapper = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    color: white;
    a{
        color: white;
        font-weight: normal;
        text-decoration:none;
        :hover{
            color: gray;
        }
    }
    `
const FormSection = styled.div`
    height: 400px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`
const ErrorMessage = styled.p`
display: flex;
font-size: 18px;
justify-content: center;
margin-top: 1rem;
color: red;
`

export default SignIn;