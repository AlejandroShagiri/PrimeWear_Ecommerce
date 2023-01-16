import { useContext, useEffect, useState } from "react";
import { FiTrash2, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Checkout from "../Checkout";

import LoadingPage from "../LoadingPage";
import { CartContext } from "./CartContext";

//Cart display the orders made by the user
const Cart = ({ userId }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const username = useState(window.localStorage.getItem("user"));

  //The CartContext is defined here to modify quantity and numInStock from their initalState
  const {
    state: { items, id },
    action: { setProductInfo, setQuantity, setDeleteQuantity },
  } = useContext(CartContext);

  //GETs the cart collection
  useEffect(() => {
    fetch(`/api/cart/${userId}`)
      .then((res) => res.json())
      .then((info) => {
        if (info.data !== undefined) {
          setCart(info.data);
          info.data.forEach((item) => {
            setProductInfo({
              quantity: item.quantity,
              numInStock: item.numInStock,
              price: parseInt(item.price.replace("$", "")),
            });
          });
          // if the cart is Empty display message: Empty cart
        } 
        else {
          document.getElementById("loading").innerHTML = "Your Cart is Empty";

        }
      });
  }, []);

  //PATCHs the quantity modified in the frontend and sends it to the backend
  const modifyItemQuantity = (id, quantity) => {
    fetch(`/api/cart/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: id, quantity: quantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data.data);
      });
  };

  //DELETEs items from the cart that are no longer wanted
  useEffect(() => {
    fetch(`/api/cart/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        //searches on the index of the userId cart and deletes from there
        if (!!data && data.deletedCount === 1) {
          const index = cart.findIndex((e) => e.userId === userId);
          cart.splice(index, 1);
          window.location.reload();
        }
      });
  }, [id]);

  //handleChange to manage the CartContext function in order to modify quantity
  const handleChange = (e, itemId) => {
    setQuantity({ quantity: e.target.value, itemId });
    cart.map((item) => {
      if (item.itemId === itemId) {
        item.quantity = e.target.value;
      }
    });
  };

  return (
    <>
      <Title>Cart</Title>
      <Container>
        <Body>

          {cart.length === 0 ?
          <LoadingDivStyle id="loading">
            <LoadingPage />
          </LoadingDivStyle>
            : (
              <div>
              {cart && cart.length > 0 && cart.map((items) => {

                  return (
                    <Itemdiv>
                      <Img src={items.imageSrc} alt="Product's image" />
                      <CartDiv className="cart">
                        <ItemName>{items.name}</ItemName>

                        <Modifications>
                          <Select
                            onChange={(e) => handleChange(e, items.itemId)}
                          >

                            {/* Giving a range of number in order to give us all the items in stock StackOverflow :https://stackoverflow.com/questions/36947847/how-to-generate-range-of-numbers-from-0-to-n-in-es2015-only */}

                            {[...Array(items.numInStock).keys()].map(
                              (element) => {
                                return (
                                  // this may cause issues
                                  //the array is starting at 0 but we want the quantity to start from 1
                                  <Option value={element + 1}>
                                    {element + 1}
                                  </Option>
                                );
                              }
                            )}
                          </Select>

                          <Update
                            onClick={() =>
                              // onClick the PATCH is called and modifies the backened quantity
                              modifyItemQuantity(items.itemId, items.quantity)
                            }
                          >
                            Update
                          </Update>

                          <DeleteBtn
                            onClick={() => {
                              setDeleteQuantity(items.itemId);
                            }}
                          >
                            <FiTrash2 size={20} />
                          </DeleteBtn>
                        </Modifications>

                        <Price className="price">{items.price}</Price>
                      </CartDiv>
                    </Itemdiv>
                  );
                })}
            </div>
          )}
        </Body>
        <Bottom>
          {cart.length === 0 ? (
            ""
          ) : (
            //button Naviagtes to the next page and modifies the quantities in Cart collection data base
            <CheckoutBtn
              className="checkout"
              onClick={(event) => {
                navigate("/checkout", { state: cart });
                event.preventDefault();
                event.stopPropagation();
              }}
            >
              Checkout
              <FiArrowRight size={25} />
            </CheckoutBtn>
          )}
        </Bottom>
      </Container>
    </>
  );
};


//--- styling ---

const LoadingDivStyle = styled.div`
  height: 80vh;
  color: white;
  display: flex;
  justify-content: center

`


const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Body = styled.div``;
const Modifications = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
`;
const Img = styled.img`
  width: 10rem;
  border-radius: 20px;
  padding: 0.5rem;
  box-shadow: inset 5px 5px 10px #11232a, inset -5px -5px 10px #1b3540;
`;
const CartDiv = styled.div``;
const ItemName = styled.h3`
  font-size: 18px;
  color: white;
`;
const Title = styled.h1`
  color: white;
  font-size: 24px;
  padding: 1rem;
`;
const Loading = styled.h1`
  color: white;
  font-size: 26px;
  padding: 1rem;
`;

const Itemdiv = styled.div`
  border-radius: 10px;
  background: #162c35;
  box-shadow: 5px 5px 10px #11232a, -5px -5px 10px #1b3540;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  gap: 2rem;
  margin: 2rem;
  padding: 1rem;
  p {
    max-width: 90%;
    color: white;
    padding-bottom: 1rem;
    padding: 1rem;
  }

  .total {
    border-top: 2px solid white;
    padding-top: 15px;
  }
`;

const Select = styled.select`
  border-radius: 10px;
  background: #162c35;
  box-shadow: 5px 5px 10px #11232a, -5px -5px 10px #1b3540;
  color: white;
  border: none;
  cursor: pointer;
  height: 40px;

  &:hover {
    color: gray;
  }

  &.active {
    color: gray;
    border-radius: 10px;
    background: #162c35;
    box-shadow: inset 5px 5px 10px #11232a, inset -5px -5px 10px #1b3540;
  }
`;
const DeleteBtn = styled.button`
  border-radius: 10px;
  background: #162c35;
  box-shadow: 5px 5px 10px #11232a, -5px -5px 10px #1b3540;
  color: white;
  border: none;
  cursor: pointer;
  height: 40px;

  &:hover {
    color: gray;
  }
`;

const Option = styled.option`
  position: absolute;
  top: 5rem;
  left: 1rem;
  color: white;
  border-radius: 15px;
  background: #162c35;
  box-shadow: 5px 5px 10px #11232a, -5px -5px 10px #1b3540;
  padding: 0.5rem;
  z-index: 1000;
  width: 20vw;
`;

const Update = styled.button`
  border-radius: 10px;
  background: #162c35;
  box-shadow: 5px 5px 10px #11232a, -5px -5px 10px #1b3540;
  color: white;
  border: none;
  cursor: pointer;
  height: 40px;

  &:hover {
    color: gray;
  }
`;
const CheckoutBtn = styled.button`
  font-size: 22px;
  font-weight: bold;
  border-radius: 10px;
  background: #162c35;
  box-shadow: 5px 5px 10px #11232a, -5px -5px 10px #1b3540;
  color: white;
  border: none;
  cursor: pointer;
  height: 40px;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 25vh;
  &:hover {
    color: gray;
  }
`;

const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 1rem;
`;

const Price = styled.h2`
  font-size: 22px;
  margin-top: 2rem;
`;
const SubTotal = styled.div``;
export default Cart;
