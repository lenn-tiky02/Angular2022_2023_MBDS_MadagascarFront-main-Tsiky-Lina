import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDataDialogComponent } from './dialog-data-dialog.component';

describe('DialogDataDialogComponent', () => {
  let component: DialogDataDialogComponent;
  let fixture: ComponentFixture<DialogDataDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDataDialogComponent]
    });
    fixture = TestBed.createComponent(DialogDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
