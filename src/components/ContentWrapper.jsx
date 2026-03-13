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
  & .ql-align-center {
    text-align: center;
  }
  & .ql-align-right {
    text-align: right;
  }
  & ol {
    padding-left: 1.5em;
    list-style-type: none;
  }
  & ul {
    padding-left: 1.5em;
    list-style-type: none;
  }
  & li[data-list="ordered"] {
    list-style-type: decimal;
  }
  & li[data-list="bullet"] {
    list-style-type: disc;
  }
  & li {
    margin: 4px 0;
  }
`;

export default ContentWrapper;
