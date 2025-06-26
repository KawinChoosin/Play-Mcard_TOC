import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  Divider,
  Fab,
  Chip,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  Close as CloseIcon,
  PhotoCamera as CameraIcon,
  Stop as StopIcon,
  Star as StarIcon,
  MonetizationOn as CoinIcon,
} from "@mui/icons-material";
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
interface GameSession {
  sessionId: string;
  itemsRemaining: number;
  coinsCollected: number;
  starsCollected: number;
  gameObjects: GameObject[];
  timeRemaining: number;
}

interface GameObject {
  id: string;
  type: "coin" | "star";
  position: {
    x: number;
    y: number;
  };
  value: number;
}

interface GameStats {
  totalCoins: number;
  totalStars: number;
  sessionTime: number;
  itemsLeft: number;
}

// Mock API functions
const startGameSession = async (): Promise<GameSession> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    sessionId: `session_${Date.now()}`,
    itemsRemaining: 1009,
    coinsCollected: 0,
    starsCollected: 0,
    gameObjects: [
      { id: "1", type: "coin", position: { x: 25, y: 25 }, value: 10 },
      { id: "2", type: "star", position: { x: 66, y: 50 }, value: 1 },
      { id: "3", type: "coin", position: { x: 50, y: 66 }, value: 10 },
    ],
    timeRemaining: 300000, // 5 minutes
  };
};

const collectItem = async (): //sessionId: string,
//itemId: string
Promise<GameStats> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  return {
    totalCoins: Math.floor(Math.random() * 100) + 10,
    totalStars: Math.floor(Math.random() * 10) + 1,
    sessionTime: 45000,
    itemsLeft: 1009 - Math.floor(Math.random() * 50),
  };
};

const GamePage: React.FC = () => {
  const [showGameInfo, setShowGameInfo] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [collectedItems, setCollectedItems] = useState<string[]>([]);
  const [showCollectMessage, setShowCollectMessage] = useState(false);
  const [collectMessage, setCollectMessage] = useState("");
  const navigate = useNavigate();

  const gameInfo = {
    itemsLeft: "1,009 objects",
    instructions: [
      "Random Coin & Star",
      "in different position",
      "need to move mobile",
      "left and right",
      "Click to collect Coins and Stars",
    ],
  };

  const handleCloseGame = () => {
    setShowGameInfo(true);
    setGameStarted(false);
    setGameSession(null);
    setCollectedItems([]);
    // In real app, this would navigate back to main menu
    console.log("Returning to Main Menu...");
    alert("Navigate back to Main Menu");
  };

  const handleStartGame = async () => {
    try {
      setLoading(true);
      const session = await startGameSession();
      setGameSession(session);
      setShowGameInfo(false);
      setGameStarted(true);
    } catch (err) {
      setError("Failed to start game session");
      console.error("Error starting game:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStopGame = () => {
    setGameStarted(false);
    setGameSession(null);
    setCollectedItems([]);
    setShowGameInfo(true);
    // In real app, this would navigate back to main menu
    console.log("Game stopped by user");
    alert("Game stopped - Navigate back to Main Menu");
    navigate("/menu");
  };

  const handleCollectItem = async (gameObject: GameObject) => {
    if (!gameSession || collectedItems.includes(gameObject.id)) return;

    try {
      setCollectedItems((prev) => [...prev, gameObject.id]);
      //const stats = await collectItem(gameSession.sessionId, gameObject.id);
      const stats = await collectItem();

      setGameSession((prev) =>
        prev
          ? {
              ...prev,
              coinsCollected: stats.totalCoins,
              starsCollected: stats.totalStars,
              itemsRemaining: stats.itemsLeft,
            }
          : null
      );

      // Show collect message
      const message =
        gameObject.type === "coin"
          ? `+${gameObject.value} Coins!`
          : `+${gameObject.value} Star!`;
      setCollectMessage(message);
      setShowCollectMessage(true);
    } catch (err) {
      console.error("Error collecting item:", err);
      // Remove from collected items if API call failed
      setCollectedItems((prev) => prev.filter((id) => id !== gameObject.id));
    }
  };

  const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f3e5f5",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <AppBar position="static" sx={{ bgcolor: "#c8e6c9" }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, color: "text.primary", fontWeight: "bold" }}
            >
              Vendor Web APP
            </Typography>
            <IconButton
              onClick={handleCloseGame}
              sx={{ color: "text.primary" }}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ m: 2 }}>
            {error}
          </Alert>
        )}

        {/* Game Info Dialog */}
        <Dialog
          open={showGameInfo}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { border: 2, borderColor: "grey.800" },
          }}
        >
          <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
            AR Game
          </DialogTitle>
          <DialogContent sx={{ pb: 3 }}>
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                {gameInfo.instructions[0]}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                ({gameInfo.itemsLeft})
              </Typography>
              {gameInfo.instructions.slice(1, -1).map((instruction, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                >
                  {instruction}
                </Typography>
              ))}
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                {gameInfo.instructions[gameInfo.instructions.length - 1]}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              onClick={handleStartGame}
              disabled={loading}
              sx={{ py: 1.5, fontWeight: "bold" }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Start Game"
              )}
            </Button>
          </DialogContent>
        </Dialog>

        {/* Game Content */}
        {!showGameInfo && gameSession && (
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
            {/* AR Camera View */}
            <Box sx={{ flex: 1, m: 2, position: "relative" }}>
              <Paper
                sx={{
                  height: "100%",
                  background:
                    "linear-gradient(135deg, #1a237e 0%, #4a148c 100%)",
                  borderRadius: 2,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Camera Placeholder */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <CameraIcon
                    sx={{ fontSize: 64, color: "white", opacity: 0.3, mb: 1 }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ color: "white", opacity: 0.5 }}
                  >
                    AR Camera View
                  </Typography>
                </Box>

                {/* Game Objects */}
                {gameStarted &&
                  gameSession.gameObjects.map((gameObject) => (
                    <Fab
                      key={gameObject.id}
                      size="medium"
                      onClick={() => handleCollectItem(gameObject)}
                      disabled={collectedItems.includes(gameObject.id)}
                      sx={{
                        position: "absolute",
                        top: `${gameObject.position.y}%`,
                        left: `${gameObject.position.x}%`,
                        bgcolor:
                          gameObject.type === "coin" ? "#ffd700" : "#fff176",
                        opacity: collectedItems.includes(gameObject.id)
                          ? 0.3
                          : 1,
                        "&:hover": {
                          bgcolor:
                            gameObject.type === "coin" ? "#ffed4e" : "#ffff8d",
                          transform: collectedItems.includes(gameObject.id)
                            ? "none"
                            : "scale(1.1)",
                        },
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      {gameObject.type === "coin" ? <CoinIcon /> : <StarIcon />}
                    </Fab>
                  ))}

                {/* Game Stats Overlay */}
                <Paper
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    bgcolor: "rgba(0,0,0,0.8)",
                    p: 2,
                    borderRadius: 1,
                  }}
                >
                  <Box
                    sx={{ display: "flex", gap: 1, flexDirection: "column" }}
                  >
                    <Chip
                      icon={<CoinIcon />}
                      label={`Coins: ${gameSession.coinsCollected}`}
                      size="small"
                      sx={{ color: "white", bgcolor: "transparent" }}
                    />
                    <Chip
                      icon={<StarIcon />}
                      label={`Stars: ${gameSession.starsCollected}`}
                      size="small"
                      sx={{ color: "white", bgcolor: "transparent" }}
                    />
                    <Chip
                      label={`Items: ${gameSession.itemsRemaining}`}
                      size="small"
                      sx={{ color: "white", bgcolor: "transparent" }}
                    />
                    <Chip
                      label={formatTime(gameSession.timeRemaining)}
                      size="small"
                      sx={{ color: "white", bgcolor: "transparent" }}
                    />
                  </Box>
                </Paper>
              </Paper>
            </Box>

            {/* Stop Game Button */}
            <Box
              sx={{
                p: 2,
                position: "sticky",
                left: "45%",
                right: "45%",
              }}
            >
              <Button
                variant="contained"
                color="error"
                size="large"
                fullWidth
                startIcon={<StopIcon />}
                onClick={handleStopGame}
                sx={{ py: 1.5, fontWeight: "bold", borderRadius: 2 }}
              >
                Stop Game
              </Button>
            </Box>
          </Box>
        )}

        {/* Collect Item Snackbar */}
        <Snackbar
          open={showCollectMessage}
          autoHideDuration={2000}
          onClose={() => setShowCollectMessage(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setShowCollectMessage(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            {collectMessage}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default GamePage;
