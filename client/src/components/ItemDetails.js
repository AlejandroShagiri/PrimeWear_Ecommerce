import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import LoadingPage from "./LoadingPage";

const ItemDetails = () => {
  const id = useParams();
  const [item, setItem] = useState(null);
  const [company, setCompany] = useState(null);
  let [quantity, setQuantity] = useState(0);

  useEffect(() => {
    fetch(`/api/get-items/id/${id.itemId}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data[0]);
      });
  }, []);

  useEffect(() => {
    fetch(`/api/get-company/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCompany(data.data);
      });
  }, []);

  //increment increases quantity when the + is clicked
  const increment = () => {
    if (quantity == item.numInStock) {
      setQuantity(item.numInStock);
    } else {
      setQuantity(quantity + 1);
    }
  };

  //decrement decreases quantity when the - is clicked
  const decrement = () => {
    if (quantity == 0) {
      setQuantity(0);
    } else {
      setQuantity(quantity - 1);
    }
  };

  //handleClick adds item to cart via a post request
  const handleClick = () => {
    fetch("/api/cart/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: item.itemId,
        userId: "12346",
        name: item.name,
        price: item.price,
        quantity: quantity,
        imageSrc: item.imageSrc,
        numInStock: item.numInStock,
        itemId: item._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.alert('Added to cart')
      })

      .catch((error) => {
        window.alert(error);
      });
  };
  //checkAvailability checks if the item is in stock; if it is not, add to cart button is disabled
  const checkAvailability = () => {
    if (item.numInStock == 0) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {item && company ? (
        <Container>
          <StyledH1>{item.name}</StyledH1>
          <ColumnDiv>
            <FirstColumnDiv>
              <StyledImg src={item.imageSrc}></StyledImg>
            </FirstColumnDiv>
            <SecondColumnDiv>
              <div>
                <DetailDiv>
                  <BoldedP>Id: </BoldedP>
                  <StyledP>{item._id}</StyledP>
                </DetailDiv>
                <DetailDiv>
                  <BoldedP>Category: </BoldedP>
                  <StyledP>{item.category}</StyledP>
                </DetailDiv>
                <DetailDiv>
                  <BoldedP>Company: </BoldedP>
                  {Object.values(company).map((element) => {
                    if (element._id == item.companyId) {
                      return <StyledP>{element.name}</StyledP>;
                    }
                  })}
                </DetailDiv>
                <DetailDiv>
                  <BoldedP>Body Location: </BoldedP>
                  <StyledP>{item.body_location}</StyledP>
                </DetailDiv>
              </div>
              <div>
                <DetailDiv>
                  <StyledPrice>{item.price}</StyledPrice>
                </DetailDiv>
                <DetailDiv>
                  <BoldedP>Stock: </BoldedP>
                  <StyledP>{item.numInStock}</StyledP>
                </DetailDiv>
                <DetailDiv>
                  <QuantityButton onClick={decrement}>-</QuantityButton>
                  <StyledInput value={quantity}></StyledInput>
                  <QuantityButton onClick={increment}>+</QuantityButton>
                  <StyledButton
                    disabled={checkAvailability()}
                    onClick={handleClick}
                  >
                    Add to Cart
                  </StyledButton>
                </DetailDiv>
              </div>
            </SecondColumnDiv>
          </ColumnDiv>
        </Container>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

//--styling
const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px;
  height: 70vh;
`;
const ColumnDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
`;

const FirstColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;
const SecondColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DetailDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

const StyledImg = styled.img`
  width: 250px;
`;
const StyledH1 = styled.h1`
  font-size: 40px;
  color: white;
`;
const BoldedP = styled.p`
  font-weight: bold;
  color: white;
  margin-right: 10px;
`;
const StyledP = styled.p`
  color: white;
`;

const StyledPrice = styled.p`
  font-size: 40px;
  color: white;
`;
const StyledButton = styled.button`
  margin-top: 10px;
  margin-left: 10px;
  padding: 5px;
`;
const StyledInput = styled.input`
  width: 40px;
  height: 30px;
  margin-top: 10px;
  text-align: center;
`;
const QuantityButton = styled.button`
  height: 30px;
  margin-top: 10px;
`;
export default ItemDetails;
