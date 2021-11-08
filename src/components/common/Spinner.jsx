import CircularProgress from '@mui/material/CircularProgress';
//import { CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { PRIMARY } from "../../colors";

export default withStyles({
  root: {
    color: "fff",
  },
  checked: {},
})((props) => <CircularProgress/>);

