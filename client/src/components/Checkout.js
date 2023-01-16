import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { IconName } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { FiX } from "react-icons/fi";

const Checkout = ({ userId }) => {
  // all the useStates that we will be handling in our form
  const { state } = useLocation();
  const [id, setId] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [expiration, setExpiration] = useState("");
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState("");
  const navigate = useNavigate();
  const username = useState(window.localStorage.getItem("user"));
  const [user, setUser] = useState("");
  const [hidden, setHidden] = useState(false);

  //all the elements we will want to handle in our mongodb and in our endpoints
  const newOrder = {
    id: id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    address: user.address,
    creditCard: creditCard,
    expiration: expiration,
    price: "$" + price,
    items: items,
  };

  //POST method into the orders collection with all of the newOrders info
  const handleClick = () => {
    fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let checkoutId = data.data.id;


        navigate("/confirmation", { state: { id: checkoutId } });
        

      })
      .catch((error) => {
        window.alert(`Item(s) not in stock`);
      });
  };
  //useEffect that handles total pricing by searching through state and giving us a number value for price and quantity
  useEffect(() => {
    let finalPrice = 0;
    state.forEach((item) => {
      finalPrice += parseInt(item.price.replace("$", "")) * item.quantity;
    });
    setPrice(finalPrice);
    setItems(state);
  });

  //useeffect that gets the current user information for the purchase
  useEffect(() => {
    fetch(`/api/user/${username[0]}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data[0]);
      });
  }, []);

  if (username === null) {
    setHidden(true);
  }

  return (
    <>
      <Title>Checkout</Title>
      <Container>
        <ConfirmationDiv>
          <p>You're purchasing the following item(s):</p>{" "}
          {state &&
            state.map((item) => {
              return (
                <ItemInfo>
                  <Info>{item.name}</Info>
                  <Info>{item.price}</Info>
                </ItemInfo>
              );
            })}
          <Total>Your total price is: ${price}</Total>
        </ConfirmationDiv>
      </Container>

      <Form>
        <PaymentDiv>
          <Subtitle>Payment Information</Subtitle>
          <CardDiv>
            <CheckoutDiv>
              <UserInput
                variant="outlined"
                label="Credit card"
                type="text"
                placeholder="Credit Card Number"
                onChange={(ev) => setCreditCard(ev.currentTarget.value)}
              />
            </CheckoutDiv>
            <CheckoutDiv>
              <UserInput
                variant="outlined"
                label="Expiration"
                type="text"
                placeholder="Expiration"
                onChange={(ev) => setExpiration(ev.currentTarget.value)}
              />
            </CheckoutDiv>
          </CardDiv>
          <ButtonDiv>
            <ButtonGreen
              onClick={(event) => {
                handleClick();
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <FiCheck size={20} />
              CONFIRM
            </ButtonGreen>

            <ButtonRed
              onClick={(event) => {
                navigate("/cart");
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              <FiX size={20} />
              CANCEL
            </ButtonRed>
          </ButtonDiv>
          <SignInText style={{ visibility: hidden ? "visible" : "hidden" }}>
            PLEASE SIGN IN FIRST
          </SignInText>
        </PaymentDiv>
      </Form>
    </>
  );
};

//----- STYLING -----
const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 28vh;
`;
const ConfirmationDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  width: 50%;
  color: white;
  border-radius: 10px;
  background: #162c35;
  box-shadow: inset 5px 5px 10px #11232a, inset -5px -5px 10px #1b3540;
`;
const ItemInfo = styled.div`
  margin: 1rem;
`;
const Info = styled.p`
  color: gray;
`;
const Title = styled.h1`
  color: white;
  font-size: 26px;
  text-align: center;
  padding: 2rem 0;
`;

const Subtitle = styled.h3`
  color: white;
  font-size: 22px;
  padding: 2rem 0;
  text-align: center;
`;
const CardDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const UserInput = styled.input`
  color: white;
  padding: 1rem;
  font-size: 16px;
  width: 15rem;
  border: none;
  margin: 0.5rem 2rem;
  border-radius: 10px;
  background: #162c35;
  box-shadow: 5px 5px 10px #11232a, -5px -5px 10px #1b3540;

  &:focus {
    outline: none;
    border-radius: 10px;
    background: #162c35;
    box-shadow: inset 5px 5px 10px #11232a, inset -5px -5px 10px #1b3540;
  }
  &::placeholder {
    color: gray;
  }
`;

const CheckoutDiv = styled.div`
  display: flex;
  width: 40%;
`;

const PaymentDiv = styled.div`
  margin-right: 5px;
  /* margin-top: 10px; */
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin: 3rem 0;
`;

const ButtonGreen = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-weight: bold;
  font-size: 16px;
  background: #162c35;
  box-shadow: 5px 5px 10px #11232a, -5px -5px 10px #1b3540;
  color: white;
  border: none;
  cursor: pointer;
  height: 40px;
  &:hover {
    color: #b0e298;
  }

  &.active {
    color: #b0e298;
    border-radius: 10px;
    background: #162c35;
    box-shadow: inset 5px 5px 10px #11232a, inset -5px -5px 10px #1b3540;
  }
`;
const ButtonRed = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-weight: bold;
  font-size: 16px;
  background: #162c35;
  box-shadow: 5px 5px 10px #11232a, -5px -5px 10px #1b3540;
  color: white;
  border: none;
  cursor: pointer;
  height: 40px;
  &:hover {
    color: tomato;
  }

  &.active {
    color: tomato;
    border-radius: 10px;
    background: #162c35;
    box-shadow: inset 5px 5px 10px #11232a, inset -5px -5px 10px #1b3540;
  }
`;
const Total = styled.h3`
  color: white;
  font-size: 22px;
  padding-top: 2rem;
`;
const SignInText = styled.p`
  text-align: center;
  color: white;
  margin-bottom: 150px;
`;

export default Checkout;
