import { Box, CircularProgress, Drawer, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Storage } from "../fun/firebase";
import { getDownloadURL, listAll, ref } from "firebase/storage";

interface Props {
  value: string | null;
  onChange: (value: string) => void;
  folderName: string;
  isOpen: boolean;
  onClose: () => void;
  isNullAllowed?: boolean;
}

const ImageSelector = ({
  value,
  onChange,
  folderName,
  isOpen,
  onClose,
  isNullAllowed = false,
}: Props) => {
  const [isActuallyOpen, setIsActuallyOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    const fetchImages = async () => {
      setIsFetching(true);
      const listRef = ref(Storage, folderName);
      const res = await listAll(listRef);
      const urls = await Promise.all(
        res.items.map(async (item) => {
          return await getDownloadURL(item);
        })
      );
      console.log(urls);
      if (isNullAllowed) {
        // on top of the list, add ""
        urls.unshift("");
      }
      setImages(urls);
      setIsFetching(false);
    };
    fetchImages();

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
          width: "90%",
        }}
      >
        <Typography variant="h5">{folderName}</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CircularProgress
            sx={{ display: isFetching ? "block" : "none", marginTop: "16px" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "16px",
          }}
        >
          {images.map((image) => (
            <div
              key={image}
              onClick={() => {
                if (image === value) {
                  return;
                }
                onChange(image);
                onClose();
              }}
              style={{
                width: "100px",
                height: "100px",
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                margin: "8px",
                cursor: "pointer",
                borderRadius: "8px",
                border: `1px dashed rgba(0,0,0,0.2)`,
              }}
            >
              {image === value && (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" style={{ color: "white" }}>
                    Selected
                  </Typography>
                </div>
              )}
            </div>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

export default ImageSelector;
