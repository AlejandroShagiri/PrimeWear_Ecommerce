import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingPage from "./LoadingPage";

const ByCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState(null);
  const [itemsByCie, setItemsByCie] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [companyItemsLoaded, setCompanyItemsLoaded] = useState(false);

  const handleChange = (e) => {
    setCompany(e.target.value);
    setCompanyItemsLoaded(false);
  };

  //fetching all companies
  useEffect(() => {
    fetch(`/api/get-companies/`)
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data.data);
        setLoaded(true);
      });
  }, []);
  //fetching all items from a specific company
  useEffect(() => {
    {
      company &&
        fetch(`/api/get-items/company/${company}`)
          .then((res) => res.json())
          .then((data) => {
            setItemsByCie(data.data);
            setCompanyItemsLoaded(true);
          });
    }
  }, [company]);

  return (
    <>
      {!loaded ? (
        <LoadingPage />
      ) : (
        <Container>
          {" "}
          {!companies ? (
            <h1>Loading...</h1>
          ) : (
            <div>
              <Title>By Companies:</Title>

              <Select onChange={handleChange}>
                <option value="">Select a company...</option>
                {companies.map((cie) => {
                  return <option key={cie.name}>{cie.name}</option>;
                })}
              </Select>
              {!company ? (
                <SelectCie>Select a company</SelectCie>
              ) : (
                <>
                  {!companyItemsLoaded ? (
                    <LoadingPage />
                  ) : (
                    <ItemCards>
                      <>
                        {itemsByCie.map((obj) => {
                          return (
                            <Nav key={obj.name} to={`/item/${obj._id}`}>
                              <Img src={obj.imageSrc} alt="Product image" />
                              <Info>
                                <List>
                                  <SmolItem>
                                    <Name>{obj.name}</Name>
                                  </SmolItem>
                                  <SmolItem>{obj.category}</SmolItem>
                                  <SmolItem>
                                    <Price>{obj.price}</Price>
                                  </SmolItem>
                                </List>
                              </Info>
                            </Nav>
                          );
                        })}
                      </>
                    </ItemCards>
                  )}
                </>
              )}
            </div>
          )}
        </Container>
      )}
    </>
  );
};
// ----- styling -----

const Container = styled.div`
  padding: 1rem;
`;
const Title = styled.h1`
  font-size: 24px;
  color: white;
`;
const Select = styled.select`
  color: white;
  padding: 5px;
  margin-top: 10px;
  border-radius: 3px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  background: #162c35;
  box-shadow: 5px 5px 10px #11232a, -5px -5px 10px #1b3540;
`;

const ItemCards = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const SelectCie = styled.h1`
  color: white;
  font-size: 26px;
  height: 70vh;
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
  flex-wrap: wrap;

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

const Img = styled.img`
  height: 100%;
  display: flex;
  border-radius: 20px;
  padding: 0.5rem;
  box-shadow: inset 5px 5px 10px #11232a, inset -5px -5px 10px #1b3540;
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

const List = styled.ul``;

const SmolItem = styled.li`
  color: gray;
  font-size: 14px;
  text-align: center;
  padding: 0.3rem;
`;
const Name = styled.span`
  font-weight: bold;
  color: white;
`;
const Price = styled.span`
  font-size: 20px;
  font-weight: bold;
`;
export default ByCompany;
