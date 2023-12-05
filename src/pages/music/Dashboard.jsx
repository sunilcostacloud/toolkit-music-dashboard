import { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  // get music
  getMusicAction,
  getMusicData,
  getMusicIsLoading,
  getMusicIsError,
  getMusicError,
  getMusicIsSuccess,

  // delete music
  resetdeleteMusic,
  deleteMusicIsError,
  deleteMusicError,
  deleteMusicIsSuccess,
  deleteMusicAction,
} from "../../redux/features/music/musicSlice";

import UploadMusic from "./UploadMusic";
// import EditMusic from "./EditMusic";

const columns = [
  {
    id: "songName",
    label: "Song Name",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },
  {
    id: "genre",
    label: "Genre",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },
  {
    id: "singer",
    label: "Singer",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },
  {
    id: "movie",
    label: "Movie",
    minwidth: 60,
    align: "left",
    background: "#755139FF",
  },
  {
    id: "file",
    label: "File",
    minwidth: 60,
    align: "center",
    background: "#755139FF",
  },
  {
    id: "actions",
    label: "Actions",
    minwidth: 60,
    align: "center",
    background: "#755139FF",
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [tableRowId, setTableRowId] = useState("");
  const [editMusicOpen, setEditMusicOpen] = useState(false);

  const [uploadMusicOpen, setUploadMusicOpen] = useState(false);

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
    setCurrentPage(1);
    dispatch(getMusicAction({ search, genre: event.target.value, page: 1 }));
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
    dispatch(getMusicAction({ search, genre, page: newPage }));
  };

  const requestSearch = () => {
    setSearch(text);
    setCurrentPage(1);
    dispatch(getMusicAction({ search: text, genre, page: 1 }));
  };

  const data = useSelector(getMusicData);
  const isLoading = useSelector(getMusicIsLoading);
  const isError = useSelector(getMusicIsError);
  const error = useSelector(getMusicError);
  const isSuccess = useSelector(getMusicIsSuccess);

  useEffect(() => {
    if (isSuccess) {
      setCurrentPage(data?.currentPage);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    dispatch(getMusicAction({ search, genre, page: currentPage }));
  }, [dispatch]);

  const isDeleteError = useSelector(deleteMusicIsError);
  const deleteError = useSelector(deleteMusicError);
  const deleteIsSuccess = useSelector(deleteMusicIsSuccess);

  const handleDeleteClick = (e, id) => {
    dispatch(deleteMusicAction(id));
  };

  const handleEditClick = (e, id) => {
    setTableRowId(id);
    setEditMusicOpen(true);
  };

  useEffect(() => {
    if (text == "") {
      setSearch("");
    }
  }, [text]);

  useEffect(() => {
    if (deleteIsSuccess) {
      alert("Music Deleted Successfully");
      dispatch(resetdeleteMusic());
      console.log("currentPage", currentPage, data?.currentPage, data);
      dispatch(
        getMusicAction({
          search,
          genre,
          page:
            data?.currentPage == 1
              ? 1
              : data?.music?.length > 2
              ? currentPage
              : data?.currentPage - 1,
        })
      );
    } else if (isDeleteError) {
      alert(deleteError?.data?.message);
      dispatch(resetdeleteMusic());
    }
  }, [deleteIsSuccess, isDeleteError]);

  return (
    <div>
      <Box
        sx={{
          width: "95%",
          margin: "auto",
          mt: 2,
          display: "flex",
          gap: "10px",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Button
            variant="contained"
            size="small"
            onClick={() => setUploadMusicOpen(true)}
          >
            Upload Songs
          </Button>
        </Box>
        <Box>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-autowidth-label">
              Genre
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={genre}
              onChange={handleGenreChange}
              autoWidth
              label="Genre"
            >
              <MenuItem value="all">
                <em>None</em>
              </MenuItem>
              {data?.genreField?.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "flex-end",
          }}
        >
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button
            variant="contained"
            size="small"
            onClick={() => requestSearch()}
          >
            Search
          </Button>
        </Box>
      </Box>

      {isLoading ? (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
        </Box>
      ) : isError ? (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <h4>{error?.data ? error?.data?.message : error}</h4>
        </Box>
      ) : isSuccess === true && data?.music?.length === 0 ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h1>No Data Found</h1>
        </Box>
      ) : isSuccess ? (
        <Box sx={{ width: "95%", margin: "auto" }}>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                width: "100%",
                overflowX: "auto",
                display: "inline-grid",
                marginTop: "10px",
              }}
            >
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="sticky table" size="small">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            background: column.background,
                            color: "#fff",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.music?.map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row._id}
                          style={{
                            background: "#F2EDD7FF",
                          }}
                        >
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.genre}</TableCell>

                          <TableCell align="left">{row.singer}</TableCell>

                          <TableCell align="left">{row.movie}</TableCell>

                          <TableCell align="center">
                            <audio controls>
                              <source src={row.file} type="audio/mp3" />
                              Your browser does not support the audio element.
                            </audio>
                          </TableCell>

                          <TableCell align="center">
                            <Box
                              sx={{
                                display: "flex",
                                gap: "10px",
                                justifyContent: "space-between",
                              }}
                            >
                              <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                onClick={(event) =>
                                  handleEditClick(event, row._id)
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={(event) =>
                                  handleDeleteClick(event, row._id)
                                }
                              >
                                Delete
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Pagination
                  count={Number(data?.pageCount)}
                  page={Number(data?.currentPage)}
                  onChange={handlePageChange}
                  variant="outlined"
                  color="primary"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        ""
      )}

      <UploadMusic
        uploadMusicOpen={uploadMusicOpen}
        setUploadMusicOpen={setUploadMusicOpen}
        setCurrentPage={setCurrentPage}
        search={search}
        genre={genre}
        currentPage={currentPage}
      />

      {/* <EditMusic
        editMusicOpen={editMusicOpen}
        setEditMusicOpen={setEditMusicOpen}
        tableRowId={tableRowId}
      /> */}
    </div>
  );
};

export default Dashboard;
