import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import TransText from "../TransText/TransText";
import { useRecoilState } from "recoil";
import { ProjectsState } from "../../recoil/projects";
import { Com } from "../../types/com";
import { Project } from "../../types/project";
import { TempMapper } from "./const_temp";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import GraphicEqIcon from "@mui/icons-material/GraphicEq";
import ImageSelector from "../ImageSelector";
import { GetFileNameFromUrl } from "../../fun/getFilename";

interface Props {
  project_id: string;
  com_id: string;
  onVideoEditorClose: () => void;
}

const VideoEditor = ({ project_id, com_id, onVideoEditorClose }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [projects, setProjects] = useRecoilState<Array<Project>>(ProjectsState);
  const [isVideoRendering, setIsVideoRendering] = useState(false);
  const [isVideoPreview, setIsVideoPreview] = useState(false);
  const [isPreviewRendering, setIsPreviewRendering] = useState(false);
  const [isWallpaperDrawerOpen, setIsWallpaperDrawerOpen] = useState(false);
  const com: Com = projects
    .find((p) => p.id === project_id)
    ?.coms.find((c) => c.id === com_id) as Com;
  const template_maps = com ? TempMapper[com?.template_id] : null;

  const getVideo = async () => {
    if (!template_maps) return;
    setIsVideoRendering(true);
    const videoUrl = await template_maps.renderer(com, false);
    setIsVideoPreview(false);
    setVideoUrl(videoUrl);
    setIsVideoRendering(false);
  };

  const previewVideo = async () => {
    if (!template_maps) return;
    if (isPreviewRendering) {
      return;
    }
    setIsPreviewRendering(true);
    const videoUrl = await template_maps.renderer(com, true);
    setIsVideoPreview(true);
    setVideoUrl(videoUrl);
    setIsPreviewRendering(false);
  };

  useEffect(() => {
    const id = setTimeout(() => {
      setIsOpen(true);
    }, 50);

    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    // everytime projects change, render preview video
    previewVideo();
  }, [projects]);

  return (
    <div>
      <Drawer
        anchor="bottom"
        open={isOpen}
        onClose={() => onVideoEditorClose()}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            maxWidth: "600px",
            margin: "0 auto",
            width: "90%",
            height: "100vh",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <TransText textId={20} />
            <Button onClick={() => onVideoEditorClose()}>
              <HighlightOffIcon />
            </Button>
          </Typography>

          <Button
            sx={{
              marginTop: "16px",
              display: isVideoRendering ? "none" : "block",
            }}
            color="primary"
            variant="outlined"
            onClick={() => {
              if (template_maps) {
                getVideo();
              }
            }}
          >
            <Box
              sx={{
                marginRight: "8px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <GraphicEqIcon sx={{ marginRight: "8px" }} />
              Render Video
            </Box>
          </Button>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CircularProgress
              sx={{ display: isVideoRendering ? "block" : "none" }}
            />
          </Box>

          {/* Video Player  */}
          {videoUrl && !isVideoRendering && (
            <video
              width="100%"
              height="auto"
              controls={!isVideoPreview}
              src={videoUrl}
              style={{ marginTop: "20px" }}
              autoPlay={!isVideoPreview}
            ></video>
          )}

          <Box
            sx={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
          >
            <Button
              variant="outlined"
              sx={{
                marginRight: "16px",
              }}
              onClick={() => {
                const new_state = prompt(
                  "Enter new title",
                  com.template_metadata.title
                );
                if (new_state) {
                  setProjects((prevProjects) =>
                    structuredClone(
                      prevProjects.map((p) => {
                        if (p.id === project_id) {
                          return {
                            ...p,
                            coms: p.coms.map((c) => {
                              if (c.id === com_id) {
                                return {
                                  ...c,
                                  template_metadata: {
                                    ...c.template_metadata,
                                    title: new_state,
                                  },
                                };
                              }
                              return c;
                            }),
                          };
                        }
                        return p;
                      })
                    )
                  );
                }
              }}
            >
              <EditIcon />
            </Button>

            <Box
              sx={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                wordWrap: "break-word",
                whiteSpace: "pre-line",
              }}
            >
              <Typography variant="h6" sx={{ width: "100%" }}>
                {com.template_metadata.title}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
          >
            <Button
              variant="outlined"
              sx={{
                marginRight: "16px",
              }}
              onClick={() => {
                setIsWallpaperDrawerOpen(true);
              }}
            >
              <EditIcon />
            </Button>
            <img
              src={com.template_metadata.background_img_url}
              alt="background"
              style={{ width: "100px", height: "auto" }}
            />
            <Typography
              variant="h6"
              sx={{
                marginLeft: "16px",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {GetFileNameFromUrl(com.template_metadata.background_img_url)}
            </Typography>

            {isWallpaperDrawerOpen && (
              <ImageSelector
                value={com.template_metadata.background_img_url}
                onChange={(value) => {
                  setProjects((prevProjects) =>
                    structuredClone(
                      prevProjects.map((p) => {
                        if (p.id === project_id) {
                          return {
                            ...p,
                            coms: p.coms.map((c) => {
                              if (c.id === com_id) {
                                return {
                                  ...c,
                                  template_metadata: {
                                    ...c.template_metadata,
                                    background_img_url: value,
                                  },
                                };
                              }
                              return c;
                            }),
                          };
                        }
                        return p;
                      })
                    )
                  );
                }}
                folderName={"wallpaper"}
                isOpen={isWallpaperDrawerOpen}
                onClose={() => setIsWallpaperDrawerOpen(false)}
              />
            )}
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            {template_maps && template_maps.conf_ui({ project_id, com_id })}
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default VideoEditor;
