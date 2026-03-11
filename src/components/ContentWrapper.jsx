import styled from "styled-components";

const ContentWrapper = styled.div`
  & strong {
    font-weight: bold;
  }
  & em {
    font-style: italic;
  }
  & u {
    text-decoration: underline;
  }
`;

export default ContentWrapper;
