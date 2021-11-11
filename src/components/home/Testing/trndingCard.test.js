import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CheckPropTypes from 'check-prop-types';
import Typography from "@material-ui/core/Typography";
import TrendingCard from './../trndingCard';
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

configure({adapter: new Adapter()});

describe('<Trending Card />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<TrendingCard post={post}/>);
    });
       
    const post =
        {
          id:"xU2rZae4q7uEYKvyEJfP",
          title:"Sinharaja,deniyaya"          
    }
    const wrongPropType ={
        post:3
  };

    it('should not throw an error if correct prop types are passed', () => {
      const propsErr = CheckPropTypes(TrendingCard.propTypes,post,'props',TrendingCard.name);
      expect(propsErr).toBeUndefined();
    });
    
    it('should throw an error if correct prop types are passed', () => {
        const propsErr = CheckPropTypes(TrendingCard.propTypes,wrongPropType,'props',TrendingCard.name);
        expect(propsErr).toBeDefined();
    });

    it('should render one Card Component to contain the destination details', () => {        
        expect(wrapper.find(Card)).toHaveLength(1);
    });

    it('should render one CardMedia Component to have the image of the destination', () => {        
        expect(wrapper.find(CardMedia)).toHaveLength(1);
    });
    it('should render two Typography Components to display title and rating', () => {
        expect(wrapper.find(Typography)).toHaveLength(2);
    });
    
         
    
    
});