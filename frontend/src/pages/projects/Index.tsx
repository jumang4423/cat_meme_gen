import { useRecoilState } from "recoil";
import { ProjectsState } from "../../recoil/projects";
import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import TransText from "../../components/TransText/TransText";
import ProjectCard from "./ProjectCard";
import { useState } from "react";
import { Translate } from "../../components/TransText/translate";
import { Project } from "../../types/project";
import { GenRandId } from "../../fun/genRandId";

function Projects() {
  const [projects, setProjects] = useRecoilState(ProjectsState);
  const [isNewProjectDrawerOpen, setIsNewProjectDrawerOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");

  const onDrawerClose = () => {
    setIsNewProjectDrawerOpen(false);
    setNewProjectName("");
    setNewProjectDescription("");
  };

  const onAddProject = () => {
    // validate
    if (newProjectName === "") {
      alert(`${Translate(8)}`);
      return;
    }
    // create new project
    const newProject: Project = {
      id: GenRandId(),
      name: newProjectName,
      description: newProjectDescription,
      coms: [],
    };
    // add to projects
    setProjects((prevProjects) =>
      structuredClone([...prevProjects, newProject])
    );
    // close drawer
    onDrawerClose();
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4">
          <TransText textId={2} />
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: "16px" }}>
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectCard project={project} setProjects={setProjects} />
          </div>
        ))}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "8px" }}
          onClick={() => setIsNewProjectDrawerOpen(true)}
        >
          <TransText textId={3} />
        </Button>
      </Box>

      <Drawer
        anchor="bottom"
        open={isNewProjectDrawerOpen}
        onClose={() => onDrawerClose()}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "20px",
            maxWidth: "600px",
            margin: "0 auto",
            width: "90%",
          }}
        >
          <Typography variant="h5">
            <TransText textId={4} />
          </Typography>

          <TextField
            required
            id="outlined-required"
            label={Translate(6)}
            sx={{ marginTop: "16px" }}
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
          />

          <TextField
            id="outlined-multiline-static"
            label={Translate(7)}
            multiline
            rows={4}
            sx={{ marginTop: "16px" }}
            value={newProjectDescription}
            onChange={(e) => setNewProjectDescription(e.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "24px", marginBottom: "16px" }}
            onClick={() => onAddProject()}
          >
            <TransText textId={5} />
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

export default Projects;
