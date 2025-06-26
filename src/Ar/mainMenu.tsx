import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Container,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { PlayArrow as PlayIcon } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#4caf50",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

// Mock API interfaces
interface UserGameInfo {
  location: string;
  dateTime: string;
  security: string;
  coinsRemaining: number;
  starsRemaining: number;
  totalCampaignCoins: number;
  itemsLeft: number;
  userProgress: {
    coinsCollected: number;
    starsCollected: number;
  };
}

// Mock API function
const fetchUserGameInfo = async (): Promise<UserGameInfo> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    location: "M5/M6/M7/M8/M10\nEMP/EMQ",
    dateTime: "27 SEP - 30 OCT\nOnly MON - THUS\n10.00-22.00",
    security: "Mcard&Security",
    coinsRemaining: 1000000, // 1M coins
    starsRemaining: 9,
    totalCampaignCoins: 1000000,
    itemsLeft: 1009,
    userProgress: {
      coinsCollected: 150,
      starsCollected: 2,
    },
  };
};

const MainMenuPage: React.FC = () => {
  const [gameInfo, setGameInfo] = useState<UserGameInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGameInfo = async () => {
      try {
        setLoading(true);
        const data = await fetchUserGameInfo();
        setGameInfo(data);
      } catch (err) {
        setError("Failed to load game information");
        console.error("Error fetching game info:", err);
      } finally {
        setLoading(false);
      }
    };

    loadGameInfo();
  }, []);

  const handleStartGame = () => {
    // In real app, this would navigate to game page
    console.log("Starting AR Game...");
    alert("Navigate to Game Page");
    navigate("/game");
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.default",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress size={60} sx={{ mb: 2 }} />
            <Typography variant="h6">Loading game information...</Typography>
          </Box>
        </Box>
      </ThemeProvider>
    );
  }

  if (error || !gameInfo) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: 2 }}>
          <Container maxWidth="sm">
            <Alert severity="error" sx={{ mt: 4 }}>
              {error || "Failed to load game information"}
            </Alert>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          p: 2,
          background: "linear-gradient(to right,rgb(63, 0, 108), red )",
        }}
      >
        <Container maxWidth="sm">
          {/* Main Info Card */}
          <Card sx={{ mb: 4, border: 2, borderColor: "grey.800" }}>
            <CardContent sx={{ p: 3 }}>
              <Typography
                variant="h6"
                sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}
              >
                Check {gameInfo.security}
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  Check Date / Time
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", whiteSpace: "pre-line" }}
                >
                  {gameInfo.dateTime}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  Check Location
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", whiteSpace: "pre-line" }}
                >
                  {gameInfo.location}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  Check สิทธิคงเหลือ
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {(gameInfo.coinsRemaining / 1000000).toFixed(0)} M Coins &{" "}
                  {gameInfo.starsRemaining} Stars
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Total cmpg{" "}
                  {(gameInfo.totalCampaignCoins / 1000000).toFixed(0)}M Coins
                </Typography>

                {/* User Progress */}
                {(gameInfo.userProgress.coinsCollected > 0 ||
                  gameInfo.userProgress.starsCollected > 0) && (
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      bgcolor: "primary.light",
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      Your Progress: {gameInfo.userProgress.coinsCollected}{" "}
                      Coins, {gameInfo.userProgress.starsCollected} Stars
                      Collected!
                    </Typography>
                  </Box>
                )}

                {/* Items Left */}
                <Box
                  sx={{
                    mt: 2,
                    p: 1.5,
                    bgcolor: "secondary.light",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "white", textAlign: "center" }}
                  >
                    {gameInfo.itemsLeft} items remaining in AR world
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Play Button */}
          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={<PlayIcon />}
            onClick={handleStartGame}
            sx={{
              py: 2,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: 2,
            }}
          >
            Start AR Game
          </Button>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default MainMenuPage;
