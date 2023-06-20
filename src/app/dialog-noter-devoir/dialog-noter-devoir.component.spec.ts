import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNoterDevoirComponent } from './dialog-noter-devoir.component';

describe('DialogNoterDevoirComponent', () => {
  let component: DialogNoterDevoirComponent;
  let fixture: ComponentFixture<DialogNoterDevoirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNoterDevoirComponent]
    });
    fixture = TestBed.createComponent(DialogNoterDevoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
