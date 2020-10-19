export interface Article {
    id?: number;
    id_user?: number;
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
    image_media_type?: string;
    thumbnail_image?: string;
    thunmbnail_media_type?: string;
}