import { useState } from "react";
import styled from "styled-components";

import LoginComponent from "../../components/hello/LoginComponent";
import SignupComponent from "../../components/hello/SignupComponent";
import { breakpoints } from "../../styles/CommonStyles";

const Hello: React.FC = () => {
  const [page, setPage] = useState(0);

  return (
    <HelloWrapper>
      {page === 0 ? (
        <LoginComponent setPage={setPage} />
      ) : (
        <SignupComponent setPage={setPage} />
      )}
    </HelloWrapper>
  );
};

const HelloWrapper = styled.div`
  width: 100%;
  min-width: 300px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: ${breakpoints.mobile}) {
    width: 300px;
    min-width: 300px;
    height: 100dvh;
  }
`;

export default Hello;
