import { Pipe, PipeTransform } from "@angular/core";
import { Article } from '../interfaces/article';

@Pipe({ name: 'articleFilter' })
export class ArticleFilterPipe implements PipeTransform {
    transform(articlesToShow: Array<Article>, searchText: string): Array<Article> {
        searchText = searchText.toLowerCase();
        return articlesToShow.filter(article => {
            return article.title.toLowerCase().includes(searchText) 
                    || article.subtitle.toLowerCase().includes(searchText) 
                    || article.abstract.toLowerCase().includes(searchText);
        })
    }
}