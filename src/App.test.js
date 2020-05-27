import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Login from "./components/login.component";
import Home from "./components/client/home.component";
import HomePT from "./components/pt/home.component";
import Register from "./components/register.component";
import Workout from "./components/client/workout.component";
import WorkoutPT from "./components/pt/workouts/workout.component";
import Messages from "./components/messages.component";
import Chat from "./components/chat.component";
import Account from "./components/account/account.component";
import BottomNav from  './components/navigation/bottomNavigation.component';
import Body from './components/account/body.component';
import AccountEdit from './components/account/accountEdit.component';
import ChangePassword from './components/account/changePassword.component';
import UserRole from './components/account/userRole.component';
import WorkoutHistory from './components/client/workoutHistory.component';
import AppBar from './components/navigation/appBar.component';

configure({ adapter: new Adapter() });


describe('Testing all navigation components render without crashing', () => {
   it('testing bottom navigation bar', () => {
      shallow(<BottomNav />);
    });
    it('testing app bar', () => {
      shallow(<AppBar />);
    });
});

describe('Testing all account components render without crashing', () => {
   it('testing messages component', () => {
      shallow(<Messages />);
    });
    it('testing account component', () => {
      shallow(<Account />);
    });
    it('testing edit user details component', () => {
      shallow(<AccountEdit />);
    });
    it('testing weight and height component', () => {
      shallow(<Body />);
    });
    it('testing change password component', () => {
      shallow(<ChangePassword />);
    });
    it('testing changing user role component', () => {
      shallow(<UserRole />);
    });
    it('testing login component', () => {
      shallow(<Login />);
    });
    it('testing register component', () => {
      shallow(<Register />);
    });
});

describe('Testing all personal trainer components render without crashing', () => {
   it('testing homepage component', () => {
      shallow(<HomePT />);
    });
    it('testing workout page component', () => {
      shallow(<WorkoutPT />);
    });
});

describe('Testing all client components render without crashing', () => {
   it('testing workout history component', () => {
      shallow(<WorkoutHistory />);
    });
    it('testing homepage component', () => {
      shallow(<Home />);
    });
    it('testing workout component', () => {
      shallow(<Workout />);
    });
});
