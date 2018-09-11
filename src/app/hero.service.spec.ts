import { TestBed, inject, getTestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import "jasmine-expect";
import { Observable } from "rxjs";
import { random, name } from "faker";
import { Hero } from "./models/hero";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";


describe("HeroService", () => {
  let
    injector: TestBed,
    service: HeroService,
    httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule ],
      providers: [ HeroService ]
    });
    injector = getTestBed();
    service = injector.get(HeroService);
    httpMock = injector.get(HttpTestingController);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe(`getHeroes`, () => {
    it(`should return an array of heroes`, done => {
      // TODO: what is the "best" way to test services with observables?
      //  -> using done() and performing assertions in the subscribe block
      //    works, but I'm sure there's a better way
      // Arrange
      const messages = [];
      spyOn(MessageService.prototype, "add").and.callFake(m => messages.push(m));
      spyOn(MessageService.prototype, "clear").and.callFake(
        () => messages.splice(0, messages.length)
      );
      const sut = injector.get(HeroService);
      // Act
      sut.getHeroes().subscribe(result => {
        // Assert
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBeTruthy();

        expect(messages).toBeArray();

        done();
      });
      const req = httpMock.expectOne("api/heroes");
      req.flush([
        "Moo", "Cow", "Bovine"
      ].map(n => new Hero(n)));
    });
  });

  xdescribe(`getHero`, () => {
    // FIXME
    it(`should return the hero identified by the id`, async () => {
      // Arrange
      const
        sut = injector.get(HeroService),
        fetchAll = promisifyObservable<Hero[]>(sut, sut.getHeroes),
        fetch = promisifyObservable(sut, sut.getHero),
        all = await fetchAll(),
        one = random.arrayElement(all);

      // Act
      window.setTimeout(() => {
        console.log("faking single request for", one.id);
        const req = httpMock.expectOne("api/heroes/" + one.id);
        req.flush(one);
      }, 10);
      const result = await fetch(one.id);
      // Assert
      expect(result).toEqual(one);
    });
  });

  function promisifyObservable<T>(ctx, func: (...args) => Observable<T>): (...args) => Promise<T> {
    return (...args) => {
      return new Promise((resolve, reject) => {
        func.apply(ctx, args).subscribe(result => {
          resolve(result);
        });
      });
    };
  }

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
