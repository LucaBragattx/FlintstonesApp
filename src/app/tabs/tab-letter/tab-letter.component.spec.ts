import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabLetterComponent } from './tab-letter.component';

describe('TabLetterComponent', () => {
  let component: TabLetterComponent;
  let fixture: ComponentFixture<TabLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
