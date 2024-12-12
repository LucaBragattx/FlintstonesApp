import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterNewComponent } from './character-new.component';

describe('CharacterNewComponent', () => {
  let component: CharacterNewComponent;
  let fixture: ComponentFixture<CharacterNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
