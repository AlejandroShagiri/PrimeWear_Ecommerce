import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";

const AllItems = () => {
  const [item, setItem] = useState(undefined);

  //fetch that get all items
  useEffect(() => {
    fetch("/api/get-items")
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data);
      });
  }, []);
  // conditional rendering + mapping through all objects and display them (no filters)
  return (
    <Container>
      {!item ? (
        <LoadingPage />
      ) : (
        <div>
          <Title>All Items</Title>
          <ItemCards>
            {item.map((object) => {
              return (
                <Nav to={`/item/${object._id}`} key={object.name}>
                  <Img src={object.imageSrc} alt="Product Image" />
                  <Info>
                    <List>
                      <SmolItem>
                        <Name>{object.name}</Name>
                      </SmolItem>
                      <SmolItem>{object.category}</SmolItem>
                      <SmolItem>
                        <Price>{object.price}</Price>
                      </SmolItem>
                    </List>
                  </Info>
                </Nav>
              );
            })}
          </ItemCards>
        </div>
      )}
    </Container>
  );
};

// --- STYLING ---
const Loading = styled.h1`
  color: white;
  font-size: 26px;
`;
const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex: wrap;
  gap: 3rem;
  flex-direction: column;
  height: 100%;
`;
const Title = styled.h1`
  font-size: 24px;
  color: white;
`;

const ItemCards = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 10px;
  flex-wrap: wrap;
`;
const List = styled.ul``;
const Name = styled.span`
  font-weight: bold;
  color: white;
`;
const Price = styled.span`
  font-size: 20px;
  font-weight: bold;
`;
const Img = styled.img`
  height: 100%;
  display: flex;
  border-radius: 20px;
  padding: 0.5rem;
  box-shadow: inset 5px 5px 10px #11232a, inset -5px -5px 10px #1b3540;
`;
const Nav = styled(NavLink)`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  border-radius: 10px;
  background: #162c35;
  box-shadow: 5px 5px 10px #11232a, -5px -5px 10px #1b3540;
  text-decoration: none;
  width: 20%;
  min-height: 20rem;

  &:hover {
    color: gray;
  }
  &:active {
    color: gray;
    border-radius: 10px;
    background: #162c35;
    box-shadow: inset 5px 5px 10px #11232a, inset -5px -5px 10px #1b3540;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: #162c35;
  box-shadow: inset 5px 5px 10px #11232a, inset -5px -5px 10px #1b3540;
  width: 100%;
  height: 40%;
`;

const SmolItem = styled.li`
  color: gray;
  font-size: 14px;
  text-align: center;
  padding: 0.3rem;
`;
export default AllItems;
