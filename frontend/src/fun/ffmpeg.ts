
import { createFFmpeg, FFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

let ffmpeg_inst: FFmpeg | null = null;
export const fontMetadata = {
    fontFilePath : "/ff.ttf",
    fontFileInFFmpeg: "ff.ttf"
}

// always run this function before using ffmpeg_inst
const initFFmpeg = async () => {
    // if already initialized, return
    if (ffmpeg_inst) return;
    const ffmpegInstance = createFFmpeg({
        mainName: "main",
        corePath: "https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js",
        log: true,
      });
      let ffmpegLoadingPromise: Promise<void> | undefined = ffmpegInstance.load();
      async function getFFmpeg() {
        if (ffmpegLoadingPromise) {
          await ffmpegLoadingPromise;
          ffmpegLoadingPromise = undefined;
        }
        return ffmpegInstance;
      }
      ffmpeg_inst = await getFFmpeg();
}

export const RunFFMpeg = async (
    args: Array<string>,
    files: Array<{
        fileName: string;
        fileUrl: string;
    }>,
    outputFileName: string
): Promise<string> => {
    try{
    // load instance if not already loaded
    if (!ffmpeg_inst) {
        await initFFmpeg();
    }
    if (!ffmpeg_inst) {
        throw new Error("FFmpeg failed to initialize");
    }
    // write files to virtual file system
    for (const file of files) {
        ffmpeg_inst.FS("writeFile", file.fileName, await fetchFile(file.fileUrl));
    }
    // load font
    ffmpeg_inst.FS("writeFile", fontMetadata.fontFileInFFmpeg, await fetchFile(fontMetadata.fontFilePath));
    // run ffmpeg
    await ffmpeg_inst.run(...args);
    const data = ffmpeg_inst.FS("readFile", outputFileName);
    const videoUrl = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));
    // clean up
    ffmpeg_inst = null;

    return videoUrl;
} catch (e) {
    alert("error occured. Please try again");
    console.error(e);
    throw e;
}
}