import { useHistory } from "react-router-dom";
import { Box, Button, Container, Typography, Grid } from "@mui/material";

const UnAuthorized = () => {
  const history = useHistory();
  return (
    <div>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Container maxWidth="md">
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Grid xs={6}>
                <Typography variant="h4">
                  You are not authorized to access this page
                </Typography>
                <Button variant="contained" onClick={() => history.push("/")}>
                  Go Back
                </Button>
              </Grid>
              <Grid xs={6}>
                <img
                  src="https://cyberhoot.com/wp-content/uploads/2019/12/access_denied.png"
                  alt=""
                  width={500}
                  height={350}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
    </div>
  );
};

export default UnAuthorized;
