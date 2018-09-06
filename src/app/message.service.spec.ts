import { TestBed, inject } from "@angular/core/testing";
import { random } from "faker";
import { MessageService } from "./message.service";

describe("MessageService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ MessageService ]
    });
  });

  it("should be created", inject([ MessageService ], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));

  describe(`behavior`, () => {
    describe(`initially`, () => {
      it(`should not have messages`, () => {
        // Arrange
        const sut = create();
        // Act
        expect(sut.hasMessages).toBeFalse();
        expect(sut.messages).toBeEmptyArray();
        // Assert
      });
    });
    describe(`adding messages`, () => {
      fit(`should be able to add a message`, () => {
        // Arrange
        const
          sut = create(),
          expected = random.words();
        // Act
        sut.add(expected);
        // Assert
        expect(sut.hasMessages).toBeTrue();
        expect(sut.messages).toBeArrayOfSize(1);
        expect(sut.messages[0]).toEqual(expected);
      });
    });
    describe(`clearing`, () => {
      it(`should clear out the messages`, () => {
        // Arrange
        const sut = create(),
          unexpected = random.words();
        // Act
        sut.add(unexpected);
        sut.clear();
        // Assert
        expect(sut.hasMessages).toBeFalse();
        expect(sut.messages).toBeEmptyArray();
      });
    });
  });

  function create() {
    return new MessageService();
  }
});
