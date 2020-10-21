import { TestBed } from '@angular/core/testing';

import { ArticleDeletedService } from './article-deleted-service';

describe('ArticleDeletedService', () => {
  let service: ArticleDeletedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleDeletedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});