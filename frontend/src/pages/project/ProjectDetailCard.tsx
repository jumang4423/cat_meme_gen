import { Box, Button, Typography } from "@mui/material";
import { Project } from "../../types/project";
import { Translate } from "../../components/TransText/translate";
import DownloadIcon from "@mui/icons-material/Download";

interface Props {
  project: Project;
}

const ProjectDetailCard = ({ project }: Props) => {
  const onVideoExport = () => {
    alert("Video Exported");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #000",
        borderRadius: "5px",
        padding: "16px",
      }}
    >
      <Typography
        variant="h5"
        sx={{ wordWrap: "break-word", whiteSpace: "pre-line" }}
      >
        {project.name}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          wordWrap: "break-word",
          whiteSpace: "pre-line",
          marginTop: "8px",
          marginBottom: "8px",
        }}
      >
        {project.description}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Button variant="outlined" color="primary" onClick={onVideoExport}>
          <DownloadIcon sx={{ marginRight: "8px" }} />
          {Translate(12)}
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectDetailCard;
