import { Icon } from "@iconify/react";
import { useRef, useState, useEffect } from "react";
import editFill from "@iconify/icons-eva/edit-fill";
import { Link as RouterLink } from "react-router-dom";
import trash2Outline from "@iconify/icons-eva/trash-2-outline";
import moreVerticalFill from "@iconify/icons-eva/more-vertical-fill";
import personFill from "@iconify/icons-eva/person-done-fill";
import { useNavigate } from "react-router";
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";

import { deleteUser, makeAdmin } from "../../../store/entities/users";
import { useDispatch } from "react-redux";

// ----------------------------------------------------------------------

export default function UserMoreMenu({ id, userRole }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          component={Button}
          onClick={async () => {
            await dispatch(deleteUser(id));
          }}
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>

        <MenuItem
          component={RouterLink}
          to={`/dashboard/editUser/${id}`}
          //to={`/dashboard/editUser/${id}`}
          sx={{ color: "text.secondary" }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Edit"
            primaryTypographyProps={{ variant: "body2" }}
          />
        </MenuItem>
        {userRole.admin == false ? (
          <MenuItem
            component={Button}
            onClick={async () => {
              await dispatch(makeAdmin(id));
            }}
            sx={{ color: "text.secondary" }}
          >
            <ListItemIcon>
              <Icon icon={personFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Make Admin"
              primaryTypographyProps={{ variant: "body2" }}
            />
          </MenuItem>
        ) : null}
      </Menu>
    </>
  );
}
