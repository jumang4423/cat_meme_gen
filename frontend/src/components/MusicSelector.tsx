import { getDownloadURL, listAll, ref } from "firebase/storage";
import { Storage } from "../fun/firebase";
import { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Drawer, Divider } from "@mui/material";
import { GetFileNameFromUrl } from "../fun/getFilename";

interface Props {
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const MusicSelector = ({ value, onChange, isOpen, onClose }: Props) => {
  const [isActuallyOpen, setIsActuallyOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [musics, setMusics] = useState<string[]>([]);
  useEffect(() => {
    const fetchMusics = async () => {
      setIsFetching(true);
      const listRef = ref(Storage, "bgm");
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map(async (item) => {
          return await getDownloadURL(item);
        })
      );
      setMusics(urls);
      setIsFetching(false);
    };
    fetchMusics();

    const id = setTimeout(() => {
      setIsActuallyOpen(isOpen);
    }, 50);

    return () => clearTimeout(id);
  }, [isOpen]);

  return (
    <Drawer anchor="bottom" open={isActuallyOpen} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        {isFetching ? (
          <CircularProgress />
        ) : (
          musics.map((music) => (
            <Box
              key={music}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "8px",
              }}
            >
              <Button
                onClick={() => {
                  onChange(music);
                  onClose();
                }}
                disabled={value === music}
                sx={{ width: "100%" }}
              >
                {GetFileNameFromUrl(music)}
              </Button>

              <audio controls>
                <source src={music} type="audio/mpeg" />
              </audio>
              <Divider sx={{ marginTop: "16px" }} />
            </Box>
          ))
        )}
      </Box>
    </Drawer>
  );
};

export default MusicSelector;
