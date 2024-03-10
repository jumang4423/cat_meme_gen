import Conf0, { Conf0Renderer } from "./ConfUI/Conf0";
import Conf1, { Conf1Renderer } from "./ConfUI/Conf1";
import Conf2, { Conf2Renderer } from "./ConfUI/Conf2";
import { ConfUIType } from "../../types/confType";
import { ComRendererType } from "../../types/comRenderer";
// for user selecting template screen
interface TemplateMetadataType {
  name: string;
  thumbnail_img_url: string;
}

// for internal video con data storing
export interface BaseTemplate {
  title: string;
  background_img_url: string;
  audio_url: string;
}

// TODO: Add more templates
// -- Template 0 -----------------------------------------
export interface Template_0 extends BaseTemplate {
  text_0: string;
  video_length_sec: number;
  image_0?: string;
}

const init_template_0: Template_0 = {
  title: "03:00 PM",
  text_0: "me vibing gangnam style",
  image_0:
    "https://firebasestorage.googleapis.com/v0/b/cat-meme-gen.appspot.com/o/overlay%2Fgangnam.png?alt=media&token=2a268622-e07c-43e7-bbba-b54279bb81e8",
  audio_url:
    "https://firebasestorage.googleapis.com/v0/b/cat-meme-gen.appspot.com/o/bgm%2Fgang.mp3?alt=media&token=79939cc9-c9e0-4bfb-9c25-ceb4c369c848",
  video_length_sec: 4,
  background_img_url:
    "https://firebasestorage.googleapis.com/v0/b/cat-meme-gen.appspot.com/o/wallpaper%2Foffice.jpeg?alt=media&token=291ca4f8-5c26-47b5-980c-069eeb4d93cf",
};

const template_metadata_0: TemplateMetadataType = {
  name: "vibing cat",
  thumbnail_img_url:
    "https://firebasestorage.googleapis.com/v0/b/cat-meme-gen.appspot.com/o/video%2Fcat_vibing.mp4?alt=media&token=a60607ec-a224-46af-aa4f-546168ba10c8",
};

// -- Template 1 -----------------------------------------
export interface Template_1 extends BaseTemplate {
  text_0: string;
  video_length_sec: number;
}

const init_template_1: Template_1 = {
  title: "7:00 AMだゾ",
  text_0: "じゃけん会社行きましょうね〜",
  audio_url:
    "https://firebasestorage.googleapis.com/v0/b/cat-meme-gen.appspot.com/o/bgm%2Fyaju_chipichapa.mp3?alt=media&token=3d61a28b-1a48-4be0-add3-5001a3734e6f",
  video_length_sec: 5,
  background_img_url:
    "https://firebasestorage.googleapis.com/v0/b/cat-meme-gen.appspot.com/o/wallpaper%2Foffice.jpeg?alt=media&token=291ca4f8-5c26-47b5-980c-069eeb4d93cf",
};

const template_metadata_1: TemplateMetadataType = {
  name: "chipi chapa yaju",
  thumbnail_img_url:
    "https://firebasestorage.googleapis.com/v0/b/cat-meme-gen.appspot.com/o/video%2Fyaju_chipichapa.mp4?alt=media&token=1c482120-4544-4409-b6f0-8e2aaf16b9d2",
};

// -- Template 2 -----------------------------------------
export interface Template_2 extends BaseTemplate {
  text_0: string;
  image_0?: string;
  video_length_sec: number;
}

const init_template_2: Template_2 = {
  title: "11:00 PM",
  text_0: "やっと退社だ〜",
  audio_url:
    "https://firebasestorage.googleapis.com/v0/b/cat-meme-gen.appspot.com/o/bgm%2Fhappycat.mp3?alt=media&token=e4b277e8-d477-4a15-94f7-e5fe2ae77d75",
  video_length_sec: 6,
  image_0:
    "https://firebasestorage.googleapis.com/v0/b/cat-meme-gen.appspot.com/o/overlay%2Fbeer.png?alt=media&token=4a50d8f6-103d-4ba6-bec8-748af488c6d6",
  background_img_url:
    "https://firebasestorage.googleapis.com/v0/b/cat-meme-gen.appspot.com/o/wallpaper%2Fnight_street.jpeg?alt=media&token=329fdd10-76ad-4e6c-a2cd-b0abc69c27eb",
};

const template_metadata_2: TemplateMetadataType = {
  name: "happy cat",
  thumbnail_img_url:
    "https://firebasestorage.googleapis.com/v0/b/cat-meme-gen.appspot.com/o/video%2Fhappy%20cat.mp4?alt=media&token=c2ec09db-3202-4a75-b5f6-f3c940fbe3e0",
};
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
    renderer: Conf0Renderer,
  },
  1: {
    init_temp: init_template_1,
    metadata: template_metadata_1,
    conf_ui: Conf1,
    renderer: Conf1Renderer,
  },
  2: {
    init_temp: init_template_2,
    metadata: template_metadata_2,
    conf_ui: Conf2,
    renderer: Conf2Renderer,
  },
};
