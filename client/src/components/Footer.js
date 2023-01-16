import styled from "styled-components";
import { NavLink } from "react-router-dom";

//Component that holds all of our footer elements

const Footer = () => {
  return (
    <Bottom>
      <MainDiv>
        <Wrapper>
          <List>
            <Item>
              <Link to="/contact">Contact us</Link>
            </Item>

            <Item>
              <Link to="/faq">FAQ</Link>
            </Item>

            <Item>
              <Link to="/careers">Careers</Link>
            </Item>
          </List>
          <Trademark> ©️ 2022 Prime Wear All Rights Reserved</Trademark>
        </Wrapper>
      </MainDiv>
    </Bottom>
  );
};

const Wrapper = styled.div`
  padding: 10px;
  border-radius: 15px;
  background: #0c181d;
  box-shadow: 5px 5px 10px #070f12, -5px -5px 10px #112128;
`;

const Link = styled(NavLink)`
  text-decoration: none;
  margin-left: 50px;
  color: white;
  cursor: pointer;
  &:hover {
    color: gray;
  }
`;

const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Item = styled.li`
  &:last-child {
    display: inline-block;
  }
`;

const Bottom = styled.footer`
  position: relative;
  bottom: 0;
  width: 100%;
`;

const Trademark = styled.p`
  font-size: small;
  text-align: center;
  margin-left: 50px;
`;

const MainDiv = styled.div`
  color: white;
  border-radius: 15px;
  background: #0c181d;
  box-shadow: 5px 5px 10px #0a1419, -5px -5px 10px #0e1c21;
`;

export default Footer;
