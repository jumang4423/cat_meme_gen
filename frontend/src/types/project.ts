import { Com } from './com';

export interface Project {
    id: string;
    name: string;
    description: string;
    coms: Array<Com>;
    thumbnail_img_url?: string;
}