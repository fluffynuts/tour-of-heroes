import { ComponentFixture, TestBed } from "@angular/core/testing";
import { random, name } from "faker";
import { HeroDetailComponent } from "./hero-detail.component";
import { imports} from "../app.module";
import {Hero} from "../models/hero";

describe("HeroDetailComponent", () => {
  let
    component: HeroDetailComponent,
    fixture: ComponentFixture<HeroDetailComponent>,
    element: Element;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ HeroDetailComponent ],
      imports
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it(`should include the hero name and id in the view`, () => {
    // Arrange
    const hero = new Hero(name.firstName(), random.number());
    // Act
    component.hero = hero;
    fixture.detectChanges();
    // Assert
    expect(element.textContent).toContain(hero.name.toUpperCase());
    expect(element.textContent).toContain(hero.id.toString());
    expect(element.textContent).not.toContain(hero.toString());
  });

});
