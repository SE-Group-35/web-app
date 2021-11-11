import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MainFeaturedPost from '../MainFeaturedPost';
import CheckPropTypes from 'check-prop-types';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import image from "../../../assets/images/homecover4.jpg";


configure({adapter: new Adapter()});

describe('<EventCard />', () => {

    let wrapper;
    const theme = {} ;

    beforeEach(() => {       
        wrapper = shallow(<ThemeProvider theme={theme}><MainFeaturedPost post={mainFeaturedPost}/></ThemeProvider>);
    });
       
    const mainFeaturedPost = {
        title: "Let's Make Your Best Trip Ever",
        description:
          "Hi! Would you explore nature paradise in the world. Let's find the best trip in Sri Lanka.Join with us!.",
        image: `${image}`,
        imgText: "main image description",
      };
    const wrongPropType ={
          post:3
    };

    it('should not throw an error if correct prop types are passed', () => {
        
        const propsErr = CheckPropTypes(MainFeaturedPost.propTypes,mainFeaturedPost,'props',MainFeaturedPost.name);
        expect(propsErr).toBeUndefined();
    });
    it('should throw an error if incorrect prop types are passed', () => {        
        const propsErr = CheckPropTypes(MainFeaturedPost.propTypes,wrongPropType,'props',MainFeaturedPost.name);        
        expect(propsErr).toBeDefined();
    }); 

    it('should matches the snapshot',() => {
        expect(wrapper.getElements()).toMatchSnapshot();
    });
    
    
         
    
    
});