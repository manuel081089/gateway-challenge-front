import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GatewayItemDetailsComponent } from './gateway-item-details.component';

describe('GatewayItemDetailsComponent', () => {
  let component: GatewayItemDetailsComponent;
  let fixture: ComponentFixture<GatewayItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GatewayItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
