import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { ProjectsState } from "../../recoil/projects";
import ProjectDetailCard from "./ProjectDetailCard";
import { Button, CircularProgress, Drawer } from "@mui/material";
import TransText from "../../components/TransText/TransText";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ComCard from "./ComCard";
import { useState } from "react";
import { TempMapper } from "../../components/VideoEditor/const_temp";
import { Translate } from "../../components/TransText/translate";
import { GenRandId } from "../../fun/genRandId";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const Project = () => {
  const { id } = useParams();
  const [projects, setProjects] = useRecoilState(ProjectsState);
  const project = projects.find((p) => p.id === id);
  const [isNewConDrawerOpen, setIsNewConDrawerOpen] = useState(false);
  const [newConTemplate, setNewConTemplate] = useState<number | undefined>(
    undefined
  );

  const onNewConDrawerClose = () => {
    setIsNewConDrawerOpen(false);
    setNewConTemplate(undefined);
  };

  const onAddCon = () => {
    // validate
    if (newConTemplate === undefined) {
      alert(`${Translate(19)}`);
      return;
    }
    // create new con
    const newCon = {
      id: GenRandId(),
      template_id: newConTemplate,
      template_metadata: structuredClone(TempMapper[newConTemplate].init_temp),
    };
    // add to project
    setProjects((prevProjects) => {
      return structuredClone(
        prevProjects.map((p) => {
          if (p.id === id) {
            return {
              ...p,
              coms: [...p.coms, newCon],
            };
          }
          return p;
        })
      );
    });
    // close drawer
    onNewConDrawerClose();
  };

  return (
    <div>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h4">
          <TransText textId={13} />
        </Typography>
        <Button href="/projects" sx={{ marginLeft: "16px" }}>
          <HighlightOffIcon />
        </Button>
      </Box>
      {project ? (
        <ProjectDetailCard project={project} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <CircularProgress size={50} />
        </div>
      )}

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {project &&
          project.coms.map((com, i) => (
            <div key={com.id}>
              <ComCard com={com} project_id={project.id} com_index={i} />
            </div>
          ))}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "24px" }}
          onClick={() => setIsNewConDrawerOpen(true)}
        >
          <TransText textId={3} />
        </Button>
      </Box>

      <Drawer
        anchor="bottom"
        open={isNewConDrawerOpen}
        onClose={() => onNewConDrawerClose()}
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
            <TransText textId={16} />
          </Typography>

          {Object.keys(TempMapper).map((key: string) => (
            <Box
              key={key}
              variant="outlined"
              sx={{
                marginTop: "16px",
                cursor: "pointer",
                border: `${
                  newConTemplate === parseInt(key)
                    ? "1px solid rgba(0,0,0,0.2)"
                    : "none"
                }`,
                padding: "8px",
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                backgroundColor: `${
                  newConTemplate === parseInt(key) ? "rgba(0,0,0,0.05)" : "none"
                }`,
                borderRadius: "16px",
              }}
              onClick={() => {
                setNewConTemplate(parseInt(key));
              }}
            >
              <video
                loop
                src={TempMapper[Number(key)].metadata.thumbnail_img_url}
                width={150}
                height={100}
                style={{
                  objectFit: "cover",
                  marginRight: "16px",
                  borderRadius: "8px",
                }}
                autoPlay
              />
              <Box sx={{ marginTop: "8px" }}>
                {TempMapper[Number(key)].metadata.name}
              </Box>
            </Box>
          ))}

          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: "24px", marginBottom: "16px" }}
            onClick={() => onAddCon()}
          >
            <TransText textId={5} />
          </Button>
        </Box>
      </Drawer>
    </div>
  );
};

export default Project;
