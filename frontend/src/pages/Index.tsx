import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TransText from "../components/TransText/TransText";
import { Typography } from "@mui/material";

function Slash() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h4">
          <TransText textId={0} />
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Button
          variant="contained"
          color="primary"
          href="/projects"
          sx={{ marginTop: "20px" }}
        >
          <TransText textId={1} />
        </Button>
      </Box>
    </div>
  );
}

export default Slash;
