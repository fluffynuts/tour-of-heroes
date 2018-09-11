import { Injectable } from "@angular/core";
import { Hero } from "./models/hero";
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap, map } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders(
    { "Content-Type": "application/json" }
  )
};

@Injectable({
  providedIn: "root"
})
export class HeroService {
  private _collectionUrl = "http://localhost/api/heroes";

  constructor(
    private _messages: MessageService,
    private _httpClient: HttpClient) {
    window["_heroSvc"] = this;
  }

  public getHeroes(): Observable<Hero[]> {
    return this._httpClient.get<Hero[]>(this._collectionUrl)
      .pipe(
        tap(heroes => this._log(`fetched ${(heroes || []).length} heroe${heroes && heroes.length === 1 ? "" : "s"}`)),
        map(heroes => this._sortByRatingAndName(heroes)),
        catchError(this._handleError("getHeroes", []))
      );
  }

  _sortByRatingAndName(heroes: Hero[]): Hero[] {
    return heroes.sort((x, y) => {
      if (x.rating === y.rating) {
        return x.name < y.name ? -1 : 1;
      }
      return x.rating > y.rating ? -1 : 1;
    });
  }

  public getHero(id: number): Observable<Hero> {
    this._log("fetch hero by id: ", id);
    return this._httpClient.get<Hero>(this._heroUrl(id))
      .pipe(
        tap(h => this._log(`fetched hero #${id}`, h)),
        catchError(this._handleError("getHero", { id: -1, name: "MooCakes" } as Hero))
      );
  }

  addHero(hero: Hero) {
    this._log("add a new hero: ", hero);
    return this._httpClient.post<Hero>(this._collectionUrl, hero, httpOptions)
      .pipe(
        tap(h => this._log("added hero: ", h)),
        catchError(this._handleError<Hero>("addHero"))
      );
  }

  deleteHero(id: number) {
    this._log("delete hero: ", id);
    return this._httpClient.delete(this._heroUrl(id))
      .pipe(
        tap(h => this._log("hero deleted: ", id)),
        catchError(this._handleError("deleteHero"))
      );
  }

  public saveHero(hero: Hero) {
    this._log("should save hero: ", hero);
    return this._httpClient.put<Hero>(this._collectionUrl, hero, httpOptions)
      .pipe(
        tap(() => {
          this._log(`Saved hero #${hero.id}`);
          },
          catchError(this._handleError("saveHero", hero))
        ));
  }

  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // should return all heroes, not none, like the tut :/
      this._log("no search... getting all heroes!");
      return this.getHeroes();
    }

    return this._httpClient.get<Hero[]>(`${this._collectionUrl}?name=${term}`)
      .pipe(
        tap(result => this._log(`found ${JSON.stringify(result)} heroes matching "${term}"`)),
        catchError(this._handleError<Hero[]>(`searchHeroes`, []))
      );
  }

  private _heroUrl(id: number): string {
    return `${this._collectionUrl}/${id}`;
  }

  private _handleError<T>(operation: string, result?: T) {
    return (error: any): Observable<T> => {
      this._log(`${operation} failed: ${this._grokError(error)}`);
      return of(result);
    };
  }

  private _grokError(error: any) {
    if (!error) {
      return "(unknown error)";
    }
    return error.message || JSON.stringify(error);
  }


  private _log(...args: (string | number | object)[]) {
    this._messages.add(`HeroService: ${args.map(this._stringify).join(" ")}`);
  }

  private _stringify(item: any): string | number | boolean {
    if (typeof item === "object") {
      return JSON.stringify(item);
    } else {
      return item;
    }
  }

  private moo(hero: Hero): Hero {
    return hero;
  }
}

