import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabGenderComponent } from './tab-gender.component';

describe('TabGenderComponent', () => {
  let component: TabGenderComponent;
  let fixture: ComponentFixture<TabGenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabGenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
