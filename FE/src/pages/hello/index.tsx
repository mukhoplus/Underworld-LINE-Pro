import { useState } from "react";
import styled from "styled-components";

import LoginComponent from "../../components/hello/LoginComponent";
import SignupComponent from "../../components/hello/SignupComponent";

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
  border: 1px solid gray;
  width: 452px;
  height: 602px;
`;

export default Hello;
