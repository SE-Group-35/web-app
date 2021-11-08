import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ImageCard from '../Card';
import CheckPropTypes from 'check-prop-types';
import renderer from 'react-test-renderer';


configure({adapter: new Adapter()});

describe('<ImageCard />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ImageCard post={newCard}/>);
    });

    const postimage1 = require("../../../assets/images/sigiriya.jpg");
    
    const newCard =
        {
          title: "Sinharaja Rain Forest",
          description:
            "The value of Sinharaja as a natural World Heritage site continues to be recognized by the discovery of several endemic species of plants and animals with a huge diversity since the declaration of this forest as a World Heritage in 1988.",
          image: `${postimage1.default}`,
          imageText: "Continue reading ",
          imageLink: "/destination",
        }


        const wrongPropType ={
            post:3
        };

    it('should not throw an error if correct prop types are passed', () => {
        const propsErr = CheckPropTypes(ImageCard.propTypes,newCard,'props',ImageCard.name);
        expect(propsErr).toBeUndefined();
    });
    it('should throw an error if incorrect prop types are passed', () => {        
        const propsErr = CheckPropTypes(ImageCard.propTypes,wrongPropType,'props',ImageCard.name);        
        expect(propsErr).toBeDefined();
    }); 
    
    it('should matches the snapshot with correct prop types',() => {
        expect(wrapper.getElements()).toMatchSnapshot();
    });
          
    
    
});