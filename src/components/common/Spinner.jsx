import { CircularProgress } from "@mui/material";
import { withStyles } from "@material-ui/styles";

export default withStyles({
  root: {
    color: "fff",
  },
  checked: {},
})((props) => <CircularProgress {...props} />);
