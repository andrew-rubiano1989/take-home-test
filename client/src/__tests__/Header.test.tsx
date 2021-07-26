import { HeaderRaw, Header } from "../components/Header";
import {shallow, configure} from 'enzyme';
import React from "react";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Header tests', () => {
    it('Renders without crashing', () => {  
        const shallowRender = shallow(<Header/>);
    });

    it('verify placeholder has text', () => {
        const wrapper =  shallow(<HeaderRaw classes={{}}/>);
        const inputField = wrapper.find('#searchField');

        expect(inputField.at(0).props().placeholder).toEqual('Search for images');
    });

    it('verify click button works', () => {
        const mockCallBack = jest.fn();

        const wrapper =  shallow(<HeaderRaw classes={{}} openModalCallback={mockCallBack}/>);
        
        // wrapper.find('.btn').simulate('click');

        // expect(mockCallBack.mock.calls.length).toEqual(1);

        // expect().toEqual('Search for images');
    });
});
