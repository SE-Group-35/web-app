import React from "react";

import {
  Paper,
  Grid,
  CircularProgress,
  Box,
  IconButton,
} from "@material-ui/core";
import { Icon } from "@iconify/react";
//import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import up from "@iconify/icons-eva/chevron-up-fill";
import down from "@iconify/icons-eva/chevron-down-fill";
import trash from "@iconify/icons-eva/trash-2-outline";
export default function ImageElement({
  image,
  index,
  isFirstElement,
  isLastElement,
  handleChangeOrderUp,
  handleChangeOrderDown,
  handleDeleteImage,
}) {
  return (
    <Box my={2} width={400}>
      <Paper>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item container alignItems="center" justify="center">
            {URL.createObjectURL(image.file) ? (
              <>
                <img
                  src={URL.createObjectURL(image.file)}
                  alt={`Upload Preview ${index + 1}`}
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                />
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justify="center"
                  item
                  xs={2}
                >
                  <Grid item container alignItems="center" justify="center">
                    {!isFirstElement && (
                      <IconButton
                        aria-label="Image up"
                        onClick={() => handleChangeOrderUp(index)}
                      >
                        <Icon icon={up} width={20} height={20} />
                      </IconButton>
                    )}
                  </Grid>
                  <Grid
                    item
                    container
                    alignItems="center"
                    justify="center"
                    xs={4}
                  >
                    <IconButton
                      aria-label="Delete Image"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <Icon icon={trash} width={20} height={20} />
                    </IconButton>
                  </Grid>
                  <Grid item container alignItems="center" justify="center">
                    {!isLastElement && (
                      <IconButton
                        aria-label="Image down"
                        onClick={() => handleChangeOrderDown(index)}
                      >
                        <Icon icon={down} width={20} height={20} />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              </>
            ) : (
              <Box p={2}>
                <CircularProgress />
              </Box>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
