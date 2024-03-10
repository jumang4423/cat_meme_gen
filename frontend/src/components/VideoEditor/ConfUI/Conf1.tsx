import { ConfUIType } from "../../../types/confType";
import { ComRendererType } from "../../../types/comRenderer";
import { Com } from "../../../types/com";
import { RunFFMpeg } from "../../../fun/ffmpeg";
import { Template_1 } from "../const_temp";
import { useRecoilState } from "recoil";
import { ProjectsState } from "../../../recoil/projects";
import { GetStrByte } from "../../../fun/getStrByte";
import { Box, Button, Slider, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const Conf1 = ({ project_id, com_id }: ConfUIType) => {
  const [projects, setProjects] = useRecoilState(ProjectsState);
  const com = projects
    ?.find((p) => p.id === project_id)
    ?.coms.find((c) => c.id === com_id) as Com;

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Button
          variant="outlined"
          sx={{
            marginRight: "16px",
          }}
          onClick={() => {
            const new_state = prompt(
              "Enter new text",
              com.template_metadata.text_0
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
                                text_0: new_state,
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
            {com.template_metadata.text_0}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box sx={{ marginTop: "16px" }}>
          <Typography variant="h6">
            video duration: {com.template_metadata.video_length_sec} seconds
          </Typography>
          <Slider
            min={2}
            max={7}
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

export default Conf1;

// Renderer
export const Conf1Renderer: ComRendererType = async (
  com: Com,
  isPreview: boolean
): Promise<string> => {
  const metadata = com.template_metadata as Template_1;
  const files = [
    {
      fileName: "bg.png",
      fileUrl: metadata.background_img_url,
    },
    {
      fileName: "yaju_chipichapa.mp4",
      fileUrl:
        "https://firebasestorage.googleapis.com/v0/b/cat-meme-gen.appspot.com/o/video%2Fyaju_chipichapa.mp4?alt=media&token=1c482120-4544-4409-b6f0-8e2aaf16b9d2",
    },
    {
      fileName: "bgm.mp3",
      fileUrl: metadata.audio_url,
    },
  ];

  const title = metadata.title
    .split("")
    .map((c) => (c === ":" ? "\\" + c : c))
    .join("");
  const title_font_x = 9 * GetStrByte(title);
  const text_0 = metadata.text_0
    .split("")
    .map((c) => (c === ":" ? "\\" + c : c))
    .join("");
  let text_0_font_x = 8 * GetStrByte(text_0) + 2;
  const text_0_fontsize = text_0_font_x > 240 ? 12 : 16;
  text_0_font_x =
    text_0_font_x > 240 ? 6 * GetStrByte(text_0) + 2 : text_0_font_x;
  const outputFileName = "output.mp4";

  const args = [
    "-i",
    "bg.png",
    "-i",
    "yaju_chipichapa.mp4",
    "-i",
    "bgm.mp3",
    "-filter_complex",
    `
    [1:v]scale=w=160:h=130[scaled],[scaled]colorkey=0x3030EE:0.3:0.1[ckout];
    [0:v][ckout]overlay=x=60:y=60,drawbox=x=0:y=0:w=${title_font_x}:h=24:color=white:t=fill,drawtext=fontfile='ff.ttf':text='${title}':fontcolor=black:fontsize=18:x=2:y=3[out];
    [out]drawbox=x=80:y=190:w=${text_0_font_x}:h=22:color=white:t=fill,drawtext=fontfile='ff.ttf':text='${text_0}':fontcolor=black:fontsize=${text_0_fontsize}:x=82:y=192[out];
    [2:a]afade=t=out:st=${metadata.video_length_sec}:d=1[aout]
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
