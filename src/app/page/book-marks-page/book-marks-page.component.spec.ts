import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookMarksPageComponent } from './book-marks-page.component';

describe('BookMarksPageComponent', () => {
  let component: BookMarksPageComponent;
  let fixture: ComponentFixture<BookMarksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookMarksPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookMarksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
