import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { Hero } from "../models/hero";
import { HeroService } from "../hero.service";

@Component({
  selector: "app-search-heroes",
  templateUrl: "./search-heroes.component.html",
  styleUrls: ["./search-heroes.component.scss"]
})
export class SearchHeroesComponent implements OnInit {
  heroes$: Observable<Hero[]> = of([]);

  constructor(private _heroService: HeroService) { }

  ngOnInit() {
  }

  search(searchTerm: string) {
    this.heroes$ = this._heroService.searchHeroes(searchTerm);
  }

}
