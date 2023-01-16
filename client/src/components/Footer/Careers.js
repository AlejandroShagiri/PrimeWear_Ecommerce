import styled from "styled-components";

//Generic Careers page in the footer
const Careers = () => {
  return (
    <>
      <TitleDiv>
        <Text>Come join the team!</Text>
      </TitleDiv>
      <Wrapper>
        <JobsDiv>
          <StylingTags href="#">Customer Support Representative</StylingTags>
          <StylingTags href="#">Data Analyst</StylingTags>
          <StylingTags href="#">Production Developer</StylingTags>
        </JobsDiv>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
`;

const Text = styled.p`
  margin-top: 20px;
  color: white;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StylingTags = styled.a`
  text-decoration: none;
  color: white;
  border-radius: 10px;
  background: #162c35;
  box-shadow: 5px 5px 10px #11232a, -5px -5px 10px #1b3540;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  gap: 32px;
  margin: 30px;
  padding: 20px;

  &:hover {
    color: gray;
  }
`;

const JobsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Careers;
