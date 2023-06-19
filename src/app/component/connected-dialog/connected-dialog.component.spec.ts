import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedDialogComponent } from './connected-dialog.component';

describe('ConnectedDialogComponent', () => {
  let component: ConnectedDialogComponent;
  let fixture: ComponentFixture<ConnectedDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectedDialogComponent]
    });
    fixture = TestBed.createComponent(ConnectedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
