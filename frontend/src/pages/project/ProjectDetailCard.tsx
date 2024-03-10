import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Project } from "../../types/project";
import { Translate } from "../../components/TransText/translate";
import DownloadIcon from "@mui/icons-material/Download";
import { useState } from "react";
import { TempMapper } from "../../components/VideoEditor/const_temp";
import { RunFFMpeg } from "../../fun/ffmpeg";

interface Props {
  project: Project;
}

const ProjectDetailCard = ({ project }: Props) => {
  const [isVideoExporting, setIsVideoExporting] = useState(false);
  const onVideoExport = async () => {
    setIsVideoExporting(true);
    // render each coms
    const comVideos: Array<string> = [];
    for (let i = 0; i < project.coms.length; i++) {
      const com = project.coms[i];
      const template_id = com.template_id;
      const comVideo = await TempMapper[template_id].renderer(com, false);
      comVideos.push(comVideo);
    }
    // concat com videos
    const outputFileName = "output.mp4";
    const args = [];
    for (let i = 0; i < comVideos.length; i++) {
      args.push("-i", `com_${i}.mp4`);
    }
    args.push(
      "-filter_complex",
      `concat=n=${comVideos.length}:v=1:a=1 [v] [a]`
    );
    args.push("-map", "[v]", "-map", "[a]");
    args.push(outputFileName);
    const files = comVideos.map((v, i) => {
      return {
        fileName: `com_${i}.mp4`,
        fileUrl: v,
      };
    });
    const finalVideo = await RunFFMpeg(args, files, outputFileName);
    // download final video
    const a = document.createElement("a");
    a.href = finalVideo;
    a.download = "output.mp4";
    a.click();
    console.log("finalVideo", finalVideo);

    setIsVideoExporting(false);
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
        <Button
          variant="outlined"
          color="primary"
          onClick={onVideoExport}
          disabled={isVideoExporting}
        >
          {isVideoExporting ? (
            <CircularProgress
              size={24}
              sx={{ marginRight: "8px" }}
              color="inherit"
            />
          ) : (
            <DownloadIcon sx={{ marginRight: "8px" }} />
          )}
          {Translate(12)}
        </Button>
      </Box>
    </Box>
  );
};

export default ProjectDetailCard;
