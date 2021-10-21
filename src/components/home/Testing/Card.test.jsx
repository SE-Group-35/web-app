import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ImageCard from '../Card';
import { Grid } from '@material-ui/core';

configure({adapter: new Adapter()});

describe('<ImageCard />', () => {
    it('should render one Grid Component', () => {
        
    });
});