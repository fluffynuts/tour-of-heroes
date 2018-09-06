import { Injectable } from "@angular/core";
import {Hero} from "./models/hero";
import {Heroes} from "./models/mock-heroes";
import {Observable, of} from "rxjs";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: "root"
})
export class HeroService {

  constructor(private _messages: MessageService) { }

  public getHeroes(): Observable<Hero[]> {
    this._messages.add("HeroService: fetched me some heroes");
    return of(Heroes);
  }
}
