import { Article } from '../interfaces/article';

export class MyArticle implements Article {
    id?: number;
    id_user: number;
    is_public: boolean;
    is_deleted: boolean;
    abstract: string;
    subtitle: string;
    update_date: Date;
    category: string;
    title: string;
    body?: string;
    image_data?: string;
    image_description?: string;
    image_media_type?: number;
    thumbnail_image?: string;
    thunmbnail_media_type?: string;

    constructor(articleInterface: Article) {
        this.id = articleInterface.id;
        this.id_user = articleInterface.id_user;
        this.is_public = articleInterface.is_public;
        this.is_deleted = articleInterface.is_deleted;
        this.abstract = articleInterface.abstract;
        this.subtitle = articleInterface.subtitle;
        this.update_date = articleInterface.update_date;
        this.category = articleInterface.category;
        this.body = articleInterface.body;
        this.image_data = articleInterface.image_data;
        this.image_description = articleInterface.image_description;
        this.image_media_type = articleInterface.image_media_type;
        this.thumbnail_image = articleInterface.thumbnail_image;
        this.thunmbnail_media_type = articleInterface.thunmbnail_media_type;
    }

    setUserID(userID: number): void {
        this.id_user = userID;
    }
}