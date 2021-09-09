import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { PRIMARY } from "../../colors";

export default withStyles({
  root: {
    "& input:valid + fieldset": {
      borderWidth: 1,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important",
      borderColor: PRIMARY,
    },
  },
})(TextField);
