import {ComponentFixture, TestBed} from "@angular/core/testing";
import {random, name} from "faker";
import {imports, declarations} from "../app.module";

import {HeroesComponent} from "./heroes.component";
import {Hero} from "../models/hero";
import {of} from "rxjs";

describe("HeroesComponent", () => {
  let
    component: HeroesComponent,
    fixture: ComponentFixture<HeroesComponent>,
    element: Element;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations,
      imports
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

});
