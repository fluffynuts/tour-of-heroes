import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HeroRatingComponent } from "./hero-rating.component";
import { imports, declarations } from "../app.module";

describe("HeroRatingComponent", () => {
  let component: HeroRatingComponent;
  let fixture: ComponentFixture<HeroRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports,
      declarations
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
