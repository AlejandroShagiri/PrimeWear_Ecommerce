import styled from "styled-components";
import {MdOutlineWatch} from "react-icons/md";


//Loading Page 
const LoadingPage=()=>{
    return (
    <Container>
        <StyledDiv><MdOutlineWatch size={60}/></StyledDiv>
    </Container>
    )
}
export default LoadingPage;

//--styling
const StyledDiv=styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: white;
animation: StyledDiv 2s infinite ease;

@keyframes StyledDiv {
    0%{transform:rotate(0deg);}
    25%{transform:rotate(180deg);}
    50%{transform:rotate(180deg);}
    75%{transform:rotate(180deg);}
    100%{transform:rotate(180deg);}
}
`
const Container=styled.div`
display: flex;
flex-direction: row;
justify-content: center;
height:80vh;
`
