import { ConfUIType } from "../../../types/confType";
import { ComRendererType } from "../../../types/comRenderer";
import { Com } from "../../../types/com";
import { RunFFMpeg } from "../../../fun/ffmpeg";
import { Template_0 } from "../const_temp";
import { useRecoilState } from "recoil";
import { ProjectsState } from "../../../recoil/projects";
import { GetStrByte } from "../../../fun/getStrByte";
import { Box, Button, Slider, Typography } from "@mui/material";
import { GetFileNameFromUrl } from "../../../fun/getFilename";
import EditIcon from "@mui/icons-material/Edit";
import ImageSelector from "../../ImageSelector";
import { useState } from "react";

const Conf0 = ({ project_id, com_id }: ConfUIType) => {
  const [projects, setProjects] = useRecoilState(ProjectsState);
  const [isOverlayDrawerOpen, setIsOverlayDrawerOpen] = useState(false);
  const com = projects
    ?.find((p) => p.id === project_id)
    ?.coms.find((c) => c.id === com_id) as Com;

  return (
    <div>
      <Box sx={{}}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            variant="outlined"
            sx={{
              marginRight: "16px",
            }}
            onClick={() => {
              setIsOverlayDrawerOpen(true);
            }}
          >
            <EditIcon />
          </Button>
          <img
            src={com.template_metadata.image_0 as string}
            alt="background"
            style={{
              width: "100px",
              height: "auto",
              display: com.template_metadata.image_0 === "" ? "none" : "block",
            }}
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
            {GetFileNameFromUrl(com.template_metadata.image_0 as string)}
            {com.template_metadata.image_0 === "" && "No overlay selected"}
          </Typography>

          {isOverlayDrawerOpen && (
            <ImageSelector
              isNullAllowed={true}
              value={com.template_metadata.image_0}
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
                                  image_0: value,
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
              folderName={"overlay"}
              isOpen={isOverlayDrawerOpen}
              onClose={() => setIsOverlayDrawerOpen(false)}
            />
          )}
        </Box>
        <Box sx={{ marginTop: "16px" }}>
          <Typography variant="h6">
            video duration: {com.template_metadata.video_length_sec} seconds
          </Typography>
          <Slider
            min={1}
            max={10}
            step={1}
            value={com.template_metadata.video_length_sec}
            marks
            onChange={(e, value) => {
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
                                video_length_sec: value as number,
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
          />
        </Box>
      </Box>
    </div>
  );
};

export default Conf0;

// Renderer
export const Conf0Renderer: ComRendererType = async (
  com: Com,
  isPreview: boolean
): Promise<string> => {
  const metadata = com.template_metadata as Template_0;
  const files = [
    {
      fileName: "bg.png",
      fileUrl: metadata.background_img_url,
    },
    {
      fileName: "cat_vibing.mp4",
      fileUrl: "/cat_vibing.mp4",
    },
    {
      fileName: "loud.mp3",
      fileUrl: "/gang.mp3",
    },
  ];
  const isCenterImg = metadata.image_0 ? true : false;
  if (isCenterImg) {
    files.push({
      fileName: "center.png",
      fileUrl: metadata.image_0 as string,
    });
  }

  const title = metadata.title
    .split("")
    .map((c) => (c === ":" ? "\\" + c : c))
    .join("");
  const title_font_x = 9 * GetStrByte(title);
  const text_0 = metadata.text_0
    .split("")
    .map((c) => (c === ":" ? "\\" + c : c))
    .join("");
  const text_0_font_x = 8 * GetStrByte(text_0) + 4;
  const outputFileName = "output.mp4";

  const args = [
    "-i",
    "bg.png",
    "-i",
    "cat_vibing.mp4",
    "-i",
    "loud.mp3",
    // Include 'center.png' conditionally
    ...(isCenterImg ? ["-i", "center.png"] : []),
    "-filter_complex",
    `
    [1:v]scale=w=200:h=100[scaled],[scaled]colorkey=0x00FF00:0.3:0.1[ckout];
    [0:v][ckout]overlay=x=10:y=120,drawbox=x=0:y=0:w=${title_font_x}:h=24:color=white:t=fill,drawtext=fontfile='ff.ttf':text='${title}':fontcolor=black:fontsize=18:x=2:y=3[out];
    [out]drawbox=x=120:y=180:w=${text_0_font_x}:h=22:color=white:t=fill,drawtext=fontfile='ff.ttf':text='${text_0}':fontcolor=black:fontsize=16:x=122:y=182[out];
    [2:a]afade=t=out:st=${metadata.video_length_sec}:d=1[aout]
    ${
      isCenterImg
        ? ";[3:v]scale=w=120:h=120[scaled2],[out][scaled2]overlay=x=140:y=40[out]"
        : ""
    }
    `,
    "-map",
    "[out]",
    "-map",
    "[aout]",
    "-t",
    `${isPreview ? "0.01" : metadata.video_length_sec}`,
    "-shortest",
    outputFileName,
  ];

  const videoUrl = await RunFFMpeg(args, files, outputFileName);

  return videoUrl;
};
