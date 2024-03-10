import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Typography,
} from "@mui/material";
import { Project } from "../../types/project";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Translate } from "../../components/TransText/translate";

interface Props {
  project: Project;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

function ProjectCard({ project, setProjects }: Props) {
  const onProjectDelete = () => {
    if (confirm(Translate(9))) {
      setProjects((prevProjects) =>
        structuredClone(prevProjects.filter((p) => p.id !== project.id))
      );
    }
  };
  return (
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
          {project.name}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Typography
          variant="h6"
          component="div"
          sx={{
            marginBottom: "16px",
            whiteSpace: "pre-line",
            wordWrap: "break-word",
          }}
        >
          {project.name}
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{
            whiteSpace: "pre-line",
            wordWrap: "break-word",
          }}
        >
          {project.description}
        </Typography>
      </AccordionDetails>
      <AccordionActions>
        <Button
          variant="contained"
          color="primary"
          href={`/project/${project.id}`}
        >
          {Translate(11)}
        </Button>
        <Button variant="outlined" color="error" onClick={onProjectDelete}>
          {Translate(10)}
        </Button>
      </AccordionActions>
    </Accordion>
  );
}

export default ProjectCard;
