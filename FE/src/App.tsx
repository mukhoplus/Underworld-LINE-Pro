import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { useAuth } from "./hooks/useAuth";
import Hello from "./pages/hello";
import Main from "./pages/main";
import { isSessionState, userIdState } from "./stores/atoms";
import { breakpoints } from "./styles/CommonStyles";

const App: React.FC = () => {
  const { checkSession } = useAuth();
  const userId = useRecoilValue(userIdState);
  const isSession = useRecoilValue(isSessionState);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (!isSession) return null;

  return <AppContainer>{userId === 0 ? <Hello /> : <Main />}</AppContainer>;
};

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: ${breakpoints.mobile}) {
    padding: 0;
    width: 100vw;
    min-width: 300px;
    height: 100dvh;
  }

  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
`;

export default App;
