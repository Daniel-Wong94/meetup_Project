import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingBackground from "./components/Landing";
import LandingContent from "./components/Landing/LandingContent";
import { Switch, Route } from "react-router";
import Homepage from "./components/Homepage";
import Discover from "./components/Discover";
import CreateGroupForm from "./components/Groups/CreateGroupForm";
import EditGroupForm from "./components/Groups/EditGroupForm";
import { getGroups } from "./store/groups";
import { getEvents } from "./store/events";
import EditEventForm from "./components/Events/EditEventForm";
import Footer from "./components/Footer";
import Settings from "./components/Settings";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(sessionActions.restoreUser());
      await dispatch(getGroups());
      await dispatch(getEvents());
      setIsLoaded(true);
    })();
  }, [dispatch]);

  return (
    isLoaded && (
      <div className="page-container">
        <Navigation />
        <div className="main-content">
          <Switch>
            <Route exact path="/">
              <LandingBackground />
              <LandingContent />
            </Route>
            <Route path="/homepage">
              <Homepage />
            </Route>
            <Route path="/discover">
              <Discover />
            </Route>
            <Route path="/create-group">
              <CreateGroupForm />
            </Route>
            <Route path="/edit-group/:groupId">
              <EditGroupForm />
            </Route>
            <Route path="/edit-event/:eventId">
              <EditEventForm />
            </Route>
            <Route path="/profile/settings">
              <Settings />
            </Route>
            <Route>404 PAGE NOT FOUND</Route>
          </Switch>
        </div>
        <Footer />
      </div>
    )
  );
};

export default App;
