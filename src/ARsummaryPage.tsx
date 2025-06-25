import {
  Box,
  Button,
  Stack,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

import Navbar from "./component/navbar";

function ARsummaryPage() {
  const progress = (3 / 9) * 100;

  const StyledLinear = styled(LinearProgress)(({}) => ({
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e6e6db",
    "& .MuiLinearProgress-bar": {
      borderRadius: 4,
      backgroundColor: "#181811",
    },
  }));
  return (
    <div>
      <Navbar title={"Summary"} backPath="/ar" status="clear" />
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          pt: "60px", // to push content below the navbar

          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            width: "100%",
            maxWidth: "900px",
            padding: 2,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Grid
            size={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60px",
              mt: 2,
            }}
          >
            <Typography fontSize={36} fontWeight={600}>
              Congratulations!
            </Typography>
          </Grid>
          <Grid
            size={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60px",
            }}
          >
            <Typography fontSize={18} textAlign={"center"}>
              You've successfully completed the game and earned rewards.
            </Typography>
          </Grid>
          <Grid size={12}>
            <Box sx={{ textAlign: "center", height: "240px", borderRadius: 5 }}>
              <CardMedia
                sx={{ height: "100%", borderRadius: 5 }}
                image="/coinbox.png"
              />
            </Box>
          </Grid>
          <Grid size={6}>
            <Box
              sx={{
                padding: 1,
                textAlign: "left",
                height: "100%",
                bgcolor: "#f5f5f0",
                borderRadius: 5,
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Coins Earned
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  fontWeight={600}
                  component="div"
                >
                  1000
                </Typography>
              </CardContent>
            </Box>
          </Grid>
          <Grid size={6}>
            <Box
              sx={{
                padding: 1,
                textAlign: "left",
                height: "100%",
                bgcolor: "#f5f5f0",
                borderRadius: 5,
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Stars Earned
                </Typography>
                <Typography
                  gutterBottom
                  variant="h5"
                  fontWeight={600}
                  component="div"
                >
                  3
                </Typography>
              </CardContent>
            </Box>
          </Grid>
          <Grid size={12}>
          <Stack spacing={0} p={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography gutterBottom variant="h6" component="div">
                Star Collection
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                3/9
              </Typography>
            </Box>
            <StyledLinear variant="determinate" value={progress} />
          </Stack></Grid>
          <Grid size={12}>
            <Button
              size="large"
              variant="contained"
              fullWidth
              sx={{ bgcolor: "#313f98", borderRadius: 5 }}
            >
              <Typography fontSize={18}>Main Menu</Typography>
            </Button>
            <Button
              size="large"
              variant="contained"
              fullWidth
              sx={{ bgcolor: "#f5f5f0", borderRadius: 5, mt: 2 }}
              href="starscollection"
            >
              <Typography fontSize={18} color="#313130">
                Stars Collection
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default ARsummaryPage;
