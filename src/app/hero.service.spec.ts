import {TestBed, inject} from "@angular/core/testing";
import {HeroService} from "./hero.service";
import {MessageService} from "./message.service";
import "jasmine-expect";


describe("HeroService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroService]
    });
  });

  it("should be created", inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));

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
      const sut = new HeroService(new MessageService());
      // Act
      sut.getHeroes().subscribe(result => {
        // Assert
        expect(result).toBeDefined();
        expect(Array.isArray(result)).toBeTruthy();

        expect(messages).toBeArray();

        done();
      });
    });
  });
});
