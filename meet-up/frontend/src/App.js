import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingBackground from "./components/Landing";
import LandingContent from "./components/Landing/LandingContent";
import { Switch, Route } from "react-router";
import Homepage from "./components/Homepage";
import Groups from "./components/Groups";
import GroupDetail from "./components/GroupDetail";
import Events from "./components/Events";

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
        <Switch>
          <Route exact path="/">
            <LandingBackground />
            <LandingContent />
          </Route>
          <Route path="/homepage">
            <Homepage />
          </Route>
          <Route exact path="/all-groups">
            <Groups />
          </Route>
          <Route path="/all-groups/:groupId">
            <GroupDetail />
          </Route>
          <Route path="/all-events">
            <Events />
          </Route>
        </Switch>
      </>
    )
  );
};

export default App;
