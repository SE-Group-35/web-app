import { toast } from 'react-toastify';
import { toastAction } from './../toastAction';

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
