import { useState } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { useFormik } from "formik";
import searchFill from "@iconify/icons-eva/search-fill";
import { ProductFilterSidebar } from "../products";
import { BlogPostsSort } from ".";
// material
import { styled } from "@material-ui/core/styles";
import {
  Box,
  Toolbar,
  Typography,
  OutlinedInput,
  InputAdornment,
  Stack,
} from "@material-ui/core";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
}));

// ----------------------------------------------------------------------

DestinationListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];

export default function DestinationListToolbar({
  numSelected,
  filterName,
  onFilterName,
}) {
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      createdAt: "",
      view: "",
      comment: "",
      gender: "",
      rating: "",
      colors: "",
    },
    onSubmit: () => {
      setOpenFilter(false);
    },
  });

  const { resetForm, handleSubmit } = formik;

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
  };
  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: "primary.main",
          bgcolor: "primary.lighter",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 5 }}
        >
          <Stack
            direction="row"
            mb={5}
            spacing={20}
            flexShrink={0}
            sx={{ my: 1 }}
          >
            <SearchStyle
              value={filterName}
              onChange={onFilterName}
              placeholder="Search destination..."
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: "text.disabled" }}
                  />
                </InputAdornment>
              }
            />
          </Stack>
        </Stack>
      )}
    </RootStyle>
  );
}
