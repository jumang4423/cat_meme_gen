- cat vibing center with loud music

```bash
ffmpeg -i winxp.png -i cat_vibing.mp4 -i loud.mp3 -filter_complex "[1:v]scale=w=iw/2:h=ih/2[scaled],[scaled]colorkey=0x00FF00:0.3:0.1[ckout];[0:v][ckout]overlay=x=(main_w-overlay_w)/2:y=(main_h-overlay_h)/2[out]" -map "[out]" -map 2:a output.mp4

ffmpeg -i winxp.png -i cat_vibing.mp4 -i loud.mp3 -filter_complex "[1:v]scale=w=iw/3:h=ih/3[scaled],[scaled]colorkey=0x00FF00:0.3:0.1[ckout];[0:v][ckout]overlay=x=(main_w-overlay_w)/2:y=(main_h-overlay_h)/2[out];[2:a]afade=t=out:st=4:d=1[aout]" -map "[out]" -map "[aout]" -t 5 -shortest output.mp4
```
