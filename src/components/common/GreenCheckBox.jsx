import { Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { PRIMARY } from '../../colors';

export default withStyles({
  root: {
    color: PRIMARY,
    '&$checked': {
      color: PRIMARY,
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);