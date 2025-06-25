import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import Navbar from "./component/navbar";

function ARpage() {
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Navbar title={"AR Page"} />
        <Card
          sx={{
            width: "90%",
            height: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f0f0f0",
            boxShadow: 3,
            mt: "60px",
          }}
        >
          AR SPACE
          <Button>
            Collect
          </Button>
        </Card>
      </Box>
    </div>
  );
}

export default ARpage;
