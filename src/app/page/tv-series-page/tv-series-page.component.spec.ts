import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvSeriesPageComponent } from './tv-series-page.component';

describe('TvSeriesPageComponent', () => {
  let component: TvSeriesPageComponent;
  let fixture: ComponentFixture<TvSeriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TvSeriesPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TvSeriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
