import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Confirmation = ({ userId }) => {
  //DELETE fetch that deletes all items in the cart of a specific user
  const handleClickTwo = () => {
    console.log("hello");
    fetch(`/api/carts/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {});
    console.log("howdy");
  };

  return (
    <>
      <Container>

      <Title>Confirmation</Title>
      <Infos>
      <ConfirmationDiv>
        <h1>Thank you for buying with Prime Wear</h1>
        <h2>Your order is confirmed!</h2>
       </ConfirmationDiv>
      </Infos>


        <NavLinkStyle
          onClick={(event) => {
            handleClickTwo();
            // event.preventDefault();
            event.stopPropagation();
          }}
          to="/Home"
        >
          Go back
        </NavLinkStyle>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100vh;
`;
const Title = styled.h1`
  color: white;
  font-size: 26px;
  padding: 2rem 0;
  text-align: center;
`;

const ConfirmationDiv = styled.div`
  color: white;
`

const NavLinkStyle = styled(NavLink)`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  border-radius: 10px;
  font-weight: bold;
  font-size: 16px;
  background: #162c35;
  color: white;
  border: none;
  cursor: pointer;
  height: 40px;

  &:hover {
    color: #b0e298;
  }
`

  // flex-direction: column;
  // gap: 1rem;
  // padding: 1rem;
  // width: 50%;
  //   color: white;
  //   border-radius: 10px;
  //   background: #162c35;
  //   box-shadow:  5px 5px 10px #11232a,
  //               -5px -5px 10px #1b3540;

const Infos = styled.div`
  display: flex;
  justify-content: center;
`

export default Confirmation;
