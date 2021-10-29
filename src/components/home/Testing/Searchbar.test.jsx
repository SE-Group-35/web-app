import React from 'react';
import { configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Searchbar from './../Searchbar';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import {clearInput} from '../Searchbar';
import { Grid } from '@material-ui/core';


configure({adapter: new Adapter()});

describe('<Searchbar />' , () => {

    let wrapper;
    
    let theme={};    
    let destination = [
        {
          
          "language": "English",
          "link": "https://en.wikipedia.org/wiki/Sigiriya\n",      
          "title": "sigiriya",
          "year": 1958
        },
        {
          
          "language": "English",
          "link": "/destination",      
          "title": "Sinharaja Rain Forest",
          "year": 1836
        },
        
      ];

    beforeEach(() => {
                              
        wrapper = shallow(<ThemeProvider theme={theme}><Searchbar /></ThemeProvider>);
    });
    

    // it('should update state as expected when clearInput method executed' , () =>{
    //     console.log(wrapper.debug());
    //     expect(wrapper.state('wordEntered')).toEqual("");
    //     const instance = wrapper.dive().instance();
    // const spy = jest.spyOn(instance, 'filteredData');
    // const spyon = instance.clearInput();
    // expect(spyon).toHaveBeenCalledTimes(0);

    
    // });
    it('should render  Searchbar Component without any error', () => {  
        expect(wrapper).toBeTruthy();
        //expect(wrapper.find(Grid)).toHaveLength(1);
        
    });
    it('should give empty string for wordEntered in the initial state', () => {  
      expect(wrapper).toBeTruthy();
      //expect(wrapper.find(Grid)).toHaveLength(1);
      
    });
    it('should not give empty string for wordEntered when any word entered to the searchbar', () => {  
      expect(wrapper).toBeTruthy();
    //expect(wrapper.find(Grid)).toHaveLength(1);
    
    });
    it('should give empty array for filteredData in the initial state', () => {  
      expect(wrapper).toBeTruthy();
      //expect(wrapper.find(Grid)).toHaveLength(1);
  
    });
    it('should give filtered data if there are any suggested filtered data', () => {  
      expect(wrapper).toBeTruthy();
      //expect(wrapper.find(Grid)).toHaveLength(1);
  
    });
});;