import SearchList from "./SearchList";
import styled from "styled-components";

function SearchPage() {
  return (
    <StyledSearchList>
      <SearchList />
    </StyledSearchList>
  );
}

const StyledSearchList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default SearchPage;
