import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";

import { useAuth } from "./hooks/useAuth";
import Hello from "./pages/hello";
import Main from "./pages/main";
import { isSessionState, userIdState } from "./stores/atoms";

const App: React.FC = () => {
  const { checkSession } = useAuth();
  const userId = useRecoilValue(userIdState);
  const isSession = useRecoilValue(isSessionState);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (!isSession) return null;

  return <>{userId === 0 ? <Hello /> : <Main />}</>;
};

export default App;
