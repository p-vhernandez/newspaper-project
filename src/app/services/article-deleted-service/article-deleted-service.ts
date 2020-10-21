import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export class ArticleDeletedService {

    updateNews = false;

    @Output() deleted: EventEmitter<boolean> = new EventEmitter();

    articleDeleted() {
        this.updateNews = true;
        this.deleted.emit(this.updateNews);
    }

}