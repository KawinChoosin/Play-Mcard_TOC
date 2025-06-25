import { Box, Typography } from '@mui/material';
import React from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

interface NavbarProps {
  title: string;
}

function Navbar({ title }: NavbarProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "60px",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          padding: "0 15px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ffffff",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Back icon on the left */}
        <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <ArrowBackIosIcon />

        </Box>

        {/* Title centered absolutely */}
        <Typography
          sx={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
}

export default Navbar;
