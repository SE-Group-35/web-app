import { toast } from 'react-toastify';
import { toastAction } from './../toastAction';

/*
  A Middleware to dispatch actions 
  generating toast notifications --> https://fkhadra.github.io/react-toastify/introduction/
*/
const toastGenerator = store => next => action => {
  if (action.type === toastAction.type) {
    try {
      toast[action.payload.type](action.payload.message);
    } catch (e) {
      console.log(e);
    }

  }
  else return next(action);
};

export default toastGenerator;
