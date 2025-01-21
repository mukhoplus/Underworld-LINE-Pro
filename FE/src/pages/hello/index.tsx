import { useState } from "react";
import styled from "styled-components";

import LoginComponent from "../../components/hello/LoginComponent";
import SignupComponent from "../../components/hello/SignupComponent";

interface HelloProps {
  setUserId: (id: number) => void;
  setIsSession: (isSession: boolean) => void;
}

const Hello: React.FC<HelloProps> = ({ setUserId, setIsSession }) => {
  const [page, setPage] = useState(0);

  return (
    <HelloWrapper>
      {page === 0 ? (
        <LoginComponent
          setPage={setPage}
          setUserId={setUserId}
          setIsSession={setIsSession}
        />
      ) : (
        <SignupComponent
          setPage={setPage}
          setUserId={setUserId}
          setIsSession={setIsSession}
        />
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
