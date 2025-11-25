import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmitirComponent } from './emitir.component';

describe('EmitirComponent', () => {
  let component: EmitirComponent;
  let fixture: ComponentFixture<EmitirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmitirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmitirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
