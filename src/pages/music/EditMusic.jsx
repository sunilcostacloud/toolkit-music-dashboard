import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  LinearProgress,
  TextField,
} from "@mui/material";
import {
  useGetMusicByIdQuery,
  useEditMusicMutation,
} from "../../redux/features/music/musicApiSlice";

const EditMusic = (props) => {
  const { editMusicOpen, setEditMusicOpen, tableRowId } = props;

  const [selectedFile, setSelectedFile] = useState(null);

  const [formValues, setFormValues] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAudioChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleClose = () => {
    setEditMusicOpen(false);
    setFormValues({});
  };

  const { isFetching, isSuccess, isError, error, data } = useGetMusicByIdQuery(
    tableRowId,
    { skip: !tableRowId }
  );

  const [
    editMusic,
    {
      isLoading,
      isSuccess: editIsSuccess,
      isError: editIsError,
      error: editError,
      reset: editReset,
    },
  ] = useEditMusicMutation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("genre", formValues.genre);
    formData.append("singer", formValues.singer);
    formData.append("movie", formValues.movie);
    if (selectedFile != null) {
      formData.append("musicFile", selectedFile);
    }
    editMusic({ tableRowId, formData });
  };

  useEffect(() => {
    if (editIsSuccess) {
      alert("Music Updated Successfully!");
      editReset();
      handleClose();
    }

    if (editIsError) {
      alert(editError?.data?.message);
      editReset();
      handleClose();
    }
  }, [editIsSuccess, editIsError]);

  useEffect(() => {
    setFormValues(data?.music);
  }, [data, tableRowId, editMusicOpen]);

  return (
    <>
      <Dialog
        open={editMusicOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogTitle id="customized-dialog-title">
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>Edit music</Box>

              <CancelIcon
                onClick={handleClose}
                sx={{
                  fontSize: "30px",
                  cursor: "pointer",
                }}
              />
            </Box>
          </DialogTitle>

          <DialogContent dividers>
            {isFetching ? (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
              </Box>
            ) : isError ? (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <h4>{error?.data?.message}</h4>
              </Box>
            ) : isSuccess ? (
              <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="name"
                      fullWidth
                      label="Name"
                      value={formValues?.name}
                      onChange={handleChange}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Genre"
                      name="genre"
                      value={formValues?.genre}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Singer"
                      name="singer"
                      value={formValues?.singer}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Movie"
                      name="movie"
                      value={formValues?.movie}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <input
                      accept="audio/*"
                      id="audio-upload"
                      type="file"
                      onChange={handleAudioChange}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  {isLoading ? (
                    <CircularProgress sx={{ color: "#fff" }} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Box>
            ) : (
              ""
            )}
          </DialogContent>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditMusic;
