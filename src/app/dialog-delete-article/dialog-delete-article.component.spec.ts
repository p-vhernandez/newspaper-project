import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteArticleComponent } from './dialog-delete-article.component';

describe('DialogDeleteArticleComponent', () => {
  let component: DialogDeleteArticleComponent;
  let fixture: ComponentFixture<DialogDeleteArticleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteArticleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
