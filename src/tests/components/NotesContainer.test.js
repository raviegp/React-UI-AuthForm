import NotesContainer from '../../components/NotesContainer';
import React from 'react';
import { shallow, mount } from 'enzyme';
import notes from '../fixtures/notes';
import { createSerializer } from 'enzyme-to-json';

expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));

let wrapper, handleRemoveNote;
beforeEach(() => {
    handleRemoveNote = jest.fn();
    wrapper = shallow(
        <NotesContainer 
            notes={notes}
            handleRemoveNote={handleRemoveNote}
        />
    );
});

test('Render NotesContainer component with notes correctly', () => {
    expect(wrapper).toMatchSnapshot();
});