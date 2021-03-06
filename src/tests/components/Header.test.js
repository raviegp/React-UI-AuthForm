import React from 'react';
import { mount } from 'enzyme';
import Header from '../../components/Header';

import { createSerializer } from 'enzyme-to-json';
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

test('Render Header correctly', () => {
    const wrapper = mount(<Header />);
    expect(wrapper).toMatchSnapshot();
});