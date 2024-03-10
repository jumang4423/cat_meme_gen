import { Com } from "./com";

// returns video url based on com data
export interface ComRendererType {
    (com: Com, isPreview: boolean): Promise<string>;
}
