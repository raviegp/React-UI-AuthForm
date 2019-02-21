import Note from '../../components/Note';
import React from 'react';
import { shallow, mount } from 'enzyme';
import { createSerializer } from 'enzyme-to-json';
import notes from '../fixtures/notes';

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

let wrapper, handleRemoveNote
beforeEach(() => {
    handleRemoveNote = jest.fn();
    wrapper = shallow(
        <Note
            note={notes[0]}
            handleRemoveNote={handleRemoveNote}
        />
    );
});

test('should render Note component correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

