import { Com } from "../../types/com";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Translate } from "../../components/TransText/translate";
import { useRecoilState } from "recoil";
import { ProjectsState } from "../../recoil/projects";
import { useState } from "react";
import VideoEditor from "../../components/VideoEditor/VideoEditor";

interface Props {
  project_id: string;
  com: Com;
}

const ComCard = ({ project_id, com }: Props) => {
  const [, setProjects] = useRecoilState(ProjectsState);
  const [isVideoEditorDrawerOpen, setIsVideoEditorDrawerOpen] = useState(false);
  const onComDelete = () => {
    if (confirm(Translate(15))) {
      setProjects((prevProjects) =>
        structuredClone(
          prevProjects.map((p) => {
            if (p.id === project_id) {
              return {
                ...p,
                coms: p.coms.filter((c) => c.id !== com.id),
              };
            }
            return p;
          })
        )
      );
    }
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{
            borderBottom: "1px solid rgba(0, 0, 0, .125)",
          }}
        >
          <Typography
            variant="h5"
            component="div"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "365px",
            }}
          >
            {com.name}
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Typography
            variant="h6"
            component="div"
            sx={{
              whiteSpace: "pre-line",
              wordWrap: "break-word",
            }}
          >
            {com.template_id}
          </Typography>
        </AccordionDetails>
        <AccordionActions>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsVideoEditorDrawerOpen(true)}
          >
            {Translate(11)}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              onComDelete();
            }}
          >
            {Translate(10)}
          </Button>
        </AccordionActions>
      </Accordion>

      {isVideoEditorDrawerOpen && (
        <VideoEditor
          project_id={project_id}
          com_id={com.id}
          onVideoEditorClose={() => setIsVideoEditorDrawerOpen(false)}
        />
      )}
    </div>
  );
};

export default ComCard;
