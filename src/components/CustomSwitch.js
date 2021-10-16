import { Switch } from "@material-ui/core";

export default function CustomSwitch(switchState, handleSwitchChange) {
  return <Switch checked={false} onChange={handleSwitchChange} />;
}
