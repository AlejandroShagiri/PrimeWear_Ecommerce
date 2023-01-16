import styled from "styled-components";

//Generic Conact page in the footer
const Contact = () => {
  return (
    <>
      <Title>Contact us: </Title>
      <Wrapper>
        <List>
          <Item>(514) 353-2336</Item>
          <Item>jaal.concordia.group@gmail.com</Item>
          <Item>1455 Boul. de Maisonneuve Ouest, Montréal, QC H3G 1M8</Item>
        </List>
      </Wrapper>
    </>
  );
};

export default Contact;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  height: 100vh;
`;

const Title = styled.h3`
  text-align: center;
  margin-top: 15px;
  color: white;
`;

const List = styled.ul`
  margin: 10px;
`;
const Item = styled.li`
  margin: 10px;
`;
