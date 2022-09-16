import LoginFormPage from "./components/LoginFormPage";
import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => await dispatch(sessionActions.restoreUser()))();
    setIsLoaded(true);
  }, [dispatch]);

  return (
    isLoaded && (
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
      </Switch>
    )
  );
};

export default App;
