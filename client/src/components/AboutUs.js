import styled from "styled-components";
import { NavLink } from "react-router-dom";


//really just a basic page with info about the cie

import oculus from "../images/oculus.jpeg"

const AboutUs = () => {
    return (
        <Container>
            <Title>About Us</Title>
            <StyledDiv>
                <div>
                    <BoldedTitle>Hi, we're Prime Wear!</BoldedTitle>
                    <Content>We're driven to make life easier and more stylish with our collection of wearable tech. </Content>
                </div>
                <StyledImg src={oculus}></StyledImg>
            </StyledDiv>
        </Container>
    )
}
//--- Styling ---

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 30px;
`
const Title = styled.h1`

color: white;
font-size: 40px;
padding: 1rem;
`
const StyledDiv=styled.div`

display: flex;
flex-direction: column;
margin: 40px;
`
const Content = styled.div`
color: white;
padding: 1rem;
height: 100px;
font-size: 20px;
`
const StyledImg=styled.img`
// height:200px;

`
const BoldedTitle=styled.h2`
color: white;
padding: 1rem;

font-size: 30px;
`

export default AboutUs