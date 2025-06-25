import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

import Navbar from "./component/navbar";

function StarsCollectionPage() {
  const starData = [
    { name: "Sirius", status: true },
    { name: "Vega", status: false },
    { name: "Polaris", status: true },
    { name: "Betelgeuse", status: false },
    { name: "Rigel", status: true },
    { name: "Altair", status: false },
    { name: "Antares", status: false },
    { name: "Procyon", status: false },
    { name: "Capella", status: false },
  ];
  return (
    <div>
      <Navbar title={"Stars Collection"} backPath="/arsummary" />
      <Box
        sx={{
          width: "100%",
          height: "100vh",
        //   display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: "60px", // space under fixed navbar
        }}
      >
        <Grid container spacing={2} sx={{ padding: 2 }}>
          {starData.map((star, index) => (
            <Grid size={ 6 } key={index}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image="/star.png"
                    alt={star.name}
                    sx={{
                      filter: star.status ? "none" : "grayscale(100%)",
                      bgcolor: star.status ? "transparent" : "#f0f0f0",
                      objectFit: "cover",
                    }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {star.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {star.status ? "In your collection" : "Not in your collection "}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default StarsCollectionPage;
