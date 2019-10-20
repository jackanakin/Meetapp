import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Profile from '~/pages/Profile';
import Dashboard from '~/pages/Dashboard';
import MeetupDetails from '~/pages/MeetupDetails';
import Meetup from '~/pages/Meetup';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/profile" component={Profile} isPrivate />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/meetup" component={Meetup} isPrivate />
      <Route path="/details" component={MeetupDetails} isPrivate />

      <Route path="/" component={() => <h1>404</h1>} />
    </Switch>
  );
}
