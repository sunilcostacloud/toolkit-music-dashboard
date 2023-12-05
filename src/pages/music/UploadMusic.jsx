import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import {
  resetUploadMusic,
  getMusicAction,
  uploadMusicIsLoading,
  uploadMusicIsError,
  uploadMusicError,
  uploadMusicIsSuccess,
  uploadMusicAction,
} from "../../redux/features/music/musicSlice";
import { useDispatch, useSelector } from "react-redux";

const UploadMusic = (props) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(uploadMusicIsLoading);
  const isError = useSelector(uploadMusicIsError);
  const error = useSelector(uploadMusicError);
  const isSuccess = useSelector(uploadMusicIsSuccess);

  const { uploadMusicOpen, setUploadMusicOpen } = props;

  const initState = {
    name: "",
    genre: "",
    singer: "",
    movie: "",
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const [formValues, setFormValues] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleAudioChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClose = () => {
    setUploadMusicOpen(false);
    setFormValues({
      name: "",
      genre: "",
      singer: "",
      movie: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("genre", formValues.genre);
    formData.append("singer", formValues.singer);
    formData.append("movie", formValues.movie);
    formData.append("musicFile", selectedFile);

    // selectedFileList.forEach((item) => {
    //   formData.append(item.title, item.selectedFile);
    // });

    dispatch(uploadMusicAction(formData));

    // const formDataObject = {};
    // for (let [key, value] of formData.entries()) {
    //   formDataObject[key] = value;
    // }
    // console.log("formData", formDataObject);
  };

  useEffect(() => {
    if (isSuccess) {
      alert("Music Uploaded Successfully!");
      dispatch(resetUploadMusic());
      dispatch(getMusicAction({ search: "", genre: "all", page: 1 }));
      handleClose();
    }

    if (isError) {
      alert(error?.data?.message);
      dispatch(resetUploadMusic());
      handleClose();
    }
  }, [isSuccess, isError]);

  return (
    <>
      <Dialog
        open={uploadMusicOpen}
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
              <Box>Upload music</Box>

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
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    label="Name"
                    value={formValues.name}
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Genre"
                    name="genre"
                    value={formValues.genre}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Singer"
                    name="singer"
                    value={formValues.singer}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Movie"
                    name="movie"
                    value={formValues.movie}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    accept="audio/*"
                    id="audio-upload"
                    type="file"
                    required
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
          </DialogContent>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UploadMusic;
