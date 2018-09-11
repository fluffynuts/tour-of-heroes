import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Observable, of } from "rxjs";
import { Hero } from "./models/hero";

const heroes = [
  "Batman",
  "Spiderman",
  "Thor",
  "Hulk",
  "Hawkeye",
  "Black Widow",
  "The Tick",
  "Mothman",
  "DeadPool"
].sort().map(n => new Hero(n));

export class InMemoryDataService implements InMemoryDbService {
  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    return {
      heroes: heroes
    };
  }

  genId<T extends { id: number }>(collection: T[]) {
    return 1 + collection.reduce((acc, cur) => Math.max(cur.id, acc), 0);
  }
}
