// import React from 'react';
// import { shallow, mount } from 'enzyme';
// import SearchBar from '../../components/SearchBar';

// let wrapper, handleSearch;

// beforeEach(() => {
//     handleSearch = jest.fn();
//     wrapper = mount(
//         <SearchBar 
//             handleSearch={handleSearch}
//         />
//     );
// });

// test('Render SearchBar correctly', () => {
//     expect(wrapper).toMatchSnapshot();
// });

// test('Call handleSearch props on key press', () => {
//     const catchReturn = () => {};
//     wrapper.find('InputBase').simulate('keyPress', {
//         catchReturn
//     });
//     expect(handleSearch).toHaveBeenCalled();
// });