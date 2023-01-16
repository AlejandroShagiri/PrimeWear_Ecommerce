import styled from "styled-components";

//Generic FAQ page in the footer
const FAQ = () => {
  return (
    <Wrapper>
      <ul>
        <Text>What is your return policy?</Text>
        <Response>- No returns, No exchanges! </Response>
        <Text>What are your shipping options?</Text>
        <Response>- We only ship in Canada</Response>
        <Text>What forms of payment do you accept?</Text>
        <Response>- Only Paypal</Response>
        <Text>Do you have a physical location?</Text>
        <Response>- No.</Response>
        <Text>Do you offer financing?</Text>
        <Response>- Yes, contact us for more info</Response>
      </ul>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: column;
  justify-content: center;
  height: 100vh;
`;

const Text = styled.li`
  color: white;
  margin-top: 20px;
  font-size: x-large;
`;

const Response = styled.p`
  color: gray;
  font-size: large;
`;

export default FAQ;
