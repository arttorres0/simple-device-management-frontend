import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DeviceRequestComponent } from "./device-request.component";

describe("DeviceRequestComponent", () => {
  let component: DeviceRequestComponent;
  let fixture: ComponentFixture<DeviceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DeviceRequestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
