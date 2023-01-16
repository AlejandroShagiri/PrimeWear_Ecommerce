import { useState, useEffect } from "react";
import styled from "styled-components";
import defaultdp from "../images/defaultdp.png";
import LoadingPage from "./LoadingPage";

//Profile page that displays user info and user's orders
const Profile = () => {
  const id=useState(window.localStorage.getItem("user"));
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState(null);


  //useEffect to get all the orders and current user info
  useEffect(() => {
    fetch(`/api/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.data);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/user/${id[0]}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data[0]);
      });
  }, []);


  return (
    <div>
    {(user&&orders)?<Container>
      <Title>Profile</Title>
      <StyledDiv>
        
        <ImgDiv>
          <StyledImg src={defaultdp}></StyledImg>
        </ImgDiv>

        <StyledUl>
          <StyledLi><StyledP>First Name:</StyledP>  {user.firstName} </StyledLi>
          <StyledLi><StyledP>Last Name: </StyledP>  {user.lastName}</StyledLi>
          <StyledLi><StyledP>Phone: </StyledP>  {user.phone}</StyledLi>
          <StyledLi><StyledP>Address: </StyledP>  {user.address}</StyledLi>
          <StyledLi><StyledP>Email: </StyledP>  {user.email}</StyledLi>
          <StyledLi><StyledP>Member Since: </StyledP>  {user.date}</StyledLi>
        </StyledUl>
        
      </StyledDiv>
      <OrderTitle>Your Orders</OrderTitle>
      <OrderContainer>
{/* order is being filtered and map to get current user's orders */}
        {(orders.length!=null)?Object.values(orders)
            .filter((order) => order.email == user.email)
            .map((order) => {
              return (
                <OrderDiv>
                  <StyledUl>
                  <StyledLi><StyledP> Order Id: </StyledP>  {order.id}</StyledLi>
                  <StyledLi2><StyledP> Order Items: </StyledP>  {Object.values(order.items).map((item)=>{return <StyledLi>{item.name}</StyledLi> })}</StyledLi2>
                  <StyledLi><StyledP>Total Price: </StyledP> {order.price}</StyledLi>
                  </StyledUl>
                </OrderDiv>
              );
            })
          : null}
      </OrderContainer>
    </Container>: <LoadingPage/>}
    </div>
  );
};
//--- styling ---
const Container = styled.div`
  padding: 1rem;
  height: 100vh;
`;

const StyledDiv = styled.div`
margin-top: 30px;
  display: flex;
  flex-direction: row;
`;

const OrderDiv = styled.div`
  border-bottom: 1px dotted white;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 10px;
`;

const ImgDiv = styled.div`

  height: 12rem;
  width: 12rem;
  border-radius: 50%;
  background: #162c35;
`

const StyledImg = styled.img`
  width: 11rem;
  height: 11rem;
  border-radius: 50%;
  background: #162c35;
  box-shadow: inset 5px 5px 10px #11232a,
            inset -5px -5px 10px #1b3540;
`
const Title = styled.h1`
  color: white;
  font-size: 24px;
`;
const OrderTitle = styled.h2`
  color: white;
  font-size: 20px;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;
const StyledUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  width: 40%;
  margin-left: 2rem;
  border-radius: 10px;
  background: #162c35;
  box-shadow:  5px 5px 10px #11232a,
              -5px -5px 10px #1b3540;
  text-decoration: none;

  :nth-child(1){
    width: 90%;
  }
  :nth-child(2){
    width:69%;
  }
`
const StyledLi = styled.li`
display: flex;
flex-direction: row;
color: white;

`
const StyledLi2 = styled.li`
color: white;
margin-top: 10px;
margin-bottom: 10px;
`
const StyledP=styled.p`
color:white;
font-weight: bold;
margin-right:10px;
`

const OrderContainer = styled.div`
color: white;
padding: 1rem;
height: 50vh;
border-radius: 10px;
background: #162c35;
box-shadow: inset 5px 5px 10px #11232a,
            inset -5px -5px 10px #1b3540;
`
;
export default Profile;
