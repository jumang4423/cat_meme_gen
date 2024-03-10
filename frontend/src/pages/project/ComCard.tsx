import { Com } from "../../types/com";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Translate } from "../../components/TransText/translate";
import { useRecoilState } from "recoil";
import { ProjectsState } from "../../recoil/projects";
import { useState } from "react";
import VideoEditor from "../../components/VideoEditor/VideoEditor";

interface Props {
  project_id: string;
  com: Com;
  com_index: number;
}

const ComCard = ({ project_id, com, com_index }: Props) => {
  const [projects, setProjects] = useRecoilState(ProjectsState);
  const coms = projects.find((p) => p.id === project_id)?.coms as Com[];
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
  const goComUp = () => {
    const new_coms = structuredClone(coms);
    const temp = new_coms[com_index];
    new_coms[com_index] = new_coms[com_index - 1];
    new_coms[com_index - 1] = temp;
    setProjects((prevProjects) =>
      structuredClone(
        prevProjects.map((p) => {
          if (p.id === project_id) {
            return {
              ...p,
              coms: new_coms,
            };
          }
          return p;
        })
      )
    );
  };
  const goComDown = () => {
    const new_coms = structuredClone(coms);
    const temp = new_coms[com_index];
    new_coms[com_index] = new_coms[com_index + 1];
    new_coms[com_index + 1] = temp;
    setProjects((prevProjects) =>
      structuredClone(
        prevProjects.map((p) => {
          if (p.id === project_id) {
            return {
              ...p,
              coms: new_coms,
            };
          }
          return p;
        })
      )
    );
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
            {com.template_metadata.title}
          </Typography>
        </AccordionSummary>

        <AccordionDetails></AccordionDetails>
        <AccordionActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => goComUp()}
            disabled={com_index === 0}
          >
            <ArrowUpwardIcon />
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => goComDown()}
            disabled={com_index === coms.length - 1}
          >
            <ArrowDownwardIcon />
          </Button>
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
