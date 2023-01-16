import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";


// import imageSrc from "../images/oculus.jpeg";

const HomePage = () => {
  //fetch items infos and mapp them accordingly wity the ItemCards template
  //there's 3 section (featured, on sale, you might like) but we can change the name for sure.
  //every item card is a navlink and should redirect user to path with its own id
  const [item, setItem] = useState([]);
  const [randomItem, setRandomItem] = useState([]);

  const [loaded, setLoaded] = useState(false);
  //this array take the first 4 items from the items array (it can be anything)
  const featuredArray = item.slice(0, 5);
  // const randomArr = randomItem.sort(() => Math.random() - Math.random()).slice(0, 5);

  useEffect(() => {
    fetch("/api/get-items")
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data);
        setRandomItem(data.data);
        setLoaded(true);
      });
  }, []);

  // const randomIndexes = Math.floor(Math.random() * randomItem.length);
  // const randomArr = randomItem[randomIndexes];
  const randomArr = randomItem
    .sort(() => Math.random() - Math.random())
    .slice(0, 5);

  return (

    <>

    {
      !loaded ?
      <LoadingPage/>
      :
      <Container>
        {!item ? (
          <Loading>Loading...</Loading>
        ) : (
          <div>
            <Title>Featured Items:</Title>
            <ItemCards>
              {featuredArray.map((object) => {
                return (
                  <Nav key={object.name} to={(`/item/${object._id}`)}>
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

            <Title>On sale:</Title>
            <ItemCards>
                  {randomArr.map((random) => {
                          return (
                              <Nav key={random.name} to={`/item/${random._id}`}>
                                  <Img src={random.imageSrc} alt="Product Image"/>
                                  <Info>
                                      <List>
                                          <SmolItem><Name>{random.name}</Name></SmolItem>
                                          <SmolItem>{random.category}</SmolItem>
                                          <SmolItem><Price>{random.price}</Price></SmolItem>
                                      </List>
                                  </Info>
                              </Nav>
                          )
                          })}

              </ItemCards>
            </div>
          )}
        </Container>
      }
    </>
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
  height: 100vh;
`;
const Title = styled.h1`
  font-size: 24px;
  color: white;
  margin: 1rem 0;
`;

const ItemCards = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 10px;
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
const MessageDiv = styled.div`
  position: absolute;
  top: 40%;
  left: 80%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 80px;
`;
const StyledDiv = styled.div`
  min-height: 100vh;
`;
export default HomePage;
