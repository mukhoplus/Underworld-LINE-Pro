import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userIdState, isSessionState } from "./stores/atoms";
import { useAuth } from "./hooks/useAuth";
import Hello from "./pages/hello";
import Main from "./pages/main";

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
