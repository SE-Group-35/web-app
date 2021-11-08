import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CategoryCard from '../categoryCard';
import CheckPropTypes from 'check-prop-types';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

configure({adapter: new Adapter()});

describe('<CategoryCard />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CategoryCard post={newCard}/>);
    });
       
    const newCard =
        {
          id:1,  
          title: "Historical",
          description:
            "description.",
          rating: 3,  
          mainPhoto: "url"          
    }
    const wrongPropType ={
          post:3
    };

    it('should not throw an error if correct prop types are passed', () => {
        const propsErr = CheckPropTypes(CategoryCard.propTypes,newCard,'props',CategoryCard.name);
        expect(propsErr).toBeUndefined();
    });
    it('should throw an error if incorrect prop types are passed', () => {        
        const propsErr = CheckPropTypes(CategoryCard.propTypes,wrongPropType,'props',CategoryCard.name);        
        expect(propsErr).toBeDefined();
    }); 
    
    it('should render one Card Component', () => {
        expect(wrapper.find(Card)).toHaveLength(1);
    });
    it('should render one CardContent Component', () => {
        expect(wrapper.find(CardContent)).toHaveLength(1);
    });
    it('should render one CardMedia Component', () => {
        expect(wrapper.find(CardMedia)).toHaveLength(1);
    });
    it('should render three Typography Components', () => {
        expect(wrapper.find(Typography)).toHaveLength(4);
    });
    it('should render three CardActionArea Components', () => {
        expect(wrapper.find(CardActionArea)).toHaveLength(1);
    });      
    
    
});