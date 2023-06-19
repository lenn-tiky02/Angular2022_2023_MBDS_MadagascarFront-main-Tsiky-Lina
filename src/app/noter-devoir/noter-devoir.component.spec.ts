import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoterDevoirComponent } from './noter-devoir.component';

describe('NoterDevoirComponent', () => {
  let component: NoterDevoirComponent;
  let fixture: ComponentFixture<NoterDevoirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoterDevoirComponent]
    });
    fixture = TestBed.createComponent(NoterDevoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
