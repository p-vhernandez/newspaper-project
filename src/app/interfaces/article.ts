import { NewBase } from './new-base';

export interface Article extends NewBase {
    body: string;
    image_data: string;
    image_description: string;
    image_media_type: number;
}