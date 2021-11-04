import React, { useState, useEffect, useRef } from "react";
import {
  TableRow,
  Checkbox,
  TableCell,
  Stack,
  Avatar,
  Switch,
  Typography,
} from "@material-ui/core";

import { UserMoreMenu } from ".";
import { getUserRole } from "../../../utils/getUserRole";
import { toggleEnable } from "../../../store/entities/users";
import { useDispatch } from "react-redux";
export default function UserRow({
  id,
  firstName,
  lastName,
  userRole,
  email,
  telephone,
  avatarUrl,
  Enabled,

  handleClick,
  isItemSelected,
}) {
  const dispatch = useDispatch();
  const [switchState, setSwitchState] = useState(Enabled);

  const handleChange = async (event) => {
    setSwitchState(event.target.checked);
    dispatch(toggleEnable(id));
  };
  return (
    <TableRow
      hover
      key={id}
      tabIndex={-1}
      role="checkbox"
      selected={isItemSelected}
      aria-checked={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isItemSelected}
          onChange={(event) => handleClick(event, firstName)}
        />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={firstName} src={avatarUrl} />
          <Typography variant="subtitle2" noWrap>
            {firstName}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="left">{lastName}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">{getUserRole(userRole)}</TableCell>

      <TableCell align="left">
        <Switch checked={switchState} onChange={handleChange} name="Enabled" />
        {switchState == true ? <h5>Enabled</h5> : <h5>Disabled</h5>}
      </TableCell>

      <TableCell align="left">{telephone}</TableCell>
      <TableCell align="right">
        <UserMoreMenu id={id} userRole={userRole} />
      </TableCell>
    </TableRow>
  );
}
