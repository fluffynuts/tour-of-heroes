import {ComponentFixture, TestBed} from "@angular/core/testing";
import {random, name} from "faker";
import {imports} from "../app.module";

import {HeroesComponent} from "./heroes.component";
import {Hero} from "../models/hero";
import {HeroDetailComponent} from "../hero-detail/hero-detail.component";
import {of} from "rxjs";

describe("HeroesComponent", () => {
  let
    component: HeroesComponent,
    fixture: ComponentFixture<HeroesComponent>,
    element: Element;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroesComponent, HeroDetailComponent],
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

  describe(`onSelect(hero)`, () => {
    it(`should set the selected hero when invoked`, () => {
      // Arrange
      const
        heroes = makeSomeHeroes(),
        expected = random.arrayElement(heroes);
      // Act
      component.heroes = of(heroes);
      component.onSelect(expected);
      // Assert
      expect(component.selectedHero).toBe(expected);
    });
  });

  function makeSomeHeroes() {
    const
      max = random.number({min: 2, max: 10}),
      result = [] as Hero[];
    for (let i = 0; i < max; i++) {
      result.push(new Hero(name.firstName()));
    }
    return result;
  }

});
