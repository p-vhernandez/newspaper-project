import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogArticleFormComponent } from './dialog-article-form.component';

describe('DialogArticleFormComponent', () => {
  let component: DialogArticleFormComponent;
  let fixture: ComponentFixture<DialogArticleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogArticleFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogArticleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
