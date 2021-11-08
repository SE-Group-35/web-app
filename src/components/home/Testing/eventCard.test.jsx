import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextCard from '../eventCard'
import CheckPropTypes from 'check-prop-types';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

configure({adapter: new Adapter()});

describe('<EventCard />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<TextCard post={eventCard}/>);
    });
       
    const eventCard =
        {
          overview:"overview",
          imageText:"imageText"          
    }
    const wrongPropType ={
          post:3
    };

    it('should not throw an error if correct prop types are passed', () => {
        const propsErr = CheckPropTypes(TextCard.propTypes,eventCard,'props',TextCard.name);
        expect(propsErr).toBeUndefined();
    });
    it('should throw an error if incorrect prop types are passed', () => {        
        const propsErr = CheckPropTypes(TextCard.propTypes,wrongPropType,'props',TextCard.name);        
        expect(propsErr).toBeDefined();
    }); 
    
    it('should render one Card Component', () => {        
        expect(wrapper.find(Card)).toHaveLength(1);
    });
    it('should render one CardContent Component', () => {
        expect(wrapper.find(CardContent)).toHaveLength(1);
    });
    
    it('should render three Typography Components', () => {
        expect(wrapper.find(Typography)).toHaveLength(3);
    });
         
    
    
});