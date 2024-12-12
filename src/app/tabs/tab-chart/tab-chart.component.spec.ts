import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabChartComponent } from './tab-chart.component';

describe('TabChartComponent', () => {
  let component: TabChartComponent;
  let fixture: ComponentFixture<TabChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
