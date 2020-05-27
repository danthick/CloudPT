import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Account from './components/account/account.component';

configure({ adapter: new Adapter() });


describe('Testing account component', () => {
   it('renders without crashing', () => {
      shallow(<Account />);
    });
});

describe('Examining the syntax of Jest tests', () => {
  it('sums numbers', () => {
      expect(1 + 2).toEqual(3);
      expect(2 + 2).toEqual(4);
   });
});