import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Landing from "./components/Landing";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(sessionActions.restoreUser());
      setIsLoaded(true);
    })();
  }, [dispatch]);

  return (
    isLoaded && (
      <>
        <Navigation />
        <Landing />
      </>
    )
  );
};

export default App;
