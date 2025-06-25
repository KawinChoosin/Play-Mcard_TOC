import { Box, Button, Card, Typography } from "@mui/material";

import Navbar from "../component/navbar";


function ARpage() {
  return (
    <div>
      <Navbar title={"AR Page"} backPath="/" />
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          sx={{
            width: "90%",
            height: "90%",
            position: "relative",
            backgroundColor: "#f0f0f0",
            boxShadow: 3,
            mt: "60px", // space under fixed navbar
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: "80px", // space for buttons at the bottom
          }}
        >
          <Typography variant="h4" gutterBottom>
            AR SPACE
          </Typography>

          {/* Buttons at bottom center */}
          <Box
            sx={{
              position: "absolute",
              bottom: 30,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              width: "100%",
            }}
          >
            {/* <Button variant="contained" color="primary">
              Collect
            </Button> */}

            <Button
              href="/arsummary"
              size="large"
              variant="contained"
              color="success"
              sx={{ borderRadius: 5, padding: 2 }}
            >
              <Typography fontSize={20}>Success</Typography>
            </Button>
          </Box>
        </Card>
      </Box>
    </div>
  );
}

export default ARpage;
