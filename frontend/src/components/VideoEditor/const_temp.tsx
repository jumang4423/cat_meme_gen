import Conf0, { Conf0Renderer } from "./ConfUI/Conf0";
import { ConfUIType } from "../../types/confType";
import { ComRendererType } from "../../types/comRenderer";
// for user selecting template screen
interface TemplateMetadataType {
  id: number;
  name: string;
  description: string;
  thumbnail_img_url: string;
}

// for internal video con data storing
export interface BaseTemplate {
  title: string;
  background_img_url: string;
}

// TODO: Add more templates
// -- Template 0 -----------------------------------------
export interface Template_0 extends BaseTemplate {
  text_0: string;
  video_length_sec: number;
  image_0?: string;
  audio_url?: string;
}

const init_template_0: Template_0 = {
  title: "03:00 PM",
  text_0: "me vibing gangnam style",
  audio_url: "/gang.mp3",
  video_length_sec: 4,
  background_img_url:
    "https://firebasestorage.googleapis.com/v0/b/cat-meme-gen.appspot.com/o/wallpaper%2Foffice.jpeg?alt=media&token=291ca4f8-5c26-47b5-980c-069eeb4d93cf",
};

const template_metadata_0: TemplateMetadataType = {
  id: 0,
  name: "vibing cat",
  description: "A cat vibing to music",
  thumbnail_img_url:
    "https://ih1.redbubble.net/image.1817908690.6343/raf,360x360,075,t,fafafa:ca443f4786.jpg",
};

// -- Template 1 -----------------------------------------

// -- Mapper ---------------------------------------------
// TODO: Add more templates
export const TempMapper: {
  [key: number]: {
    init_temp: BaseTemplate;
    metadata: TemplateMetadataType;
    conf_ui: React.FC<ConfUIType>;
    renderer: ComRendererType;
  };
} = {
  0: {
    init_temp: init_template_0,
    metadata: template_metadata_0,
    conf_ui: Conf0,
    // TODO: implement renderer
    renderer: Conf0Renderer,
  },
};
