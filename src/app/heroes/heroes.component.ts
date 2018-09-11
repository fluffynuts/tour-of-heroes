import {Component, OnInit} from "@angular/core";
import {HeroService} from "../hero.service";
import { Hero } from "../models/hero";

@Component({
  selector: "app-heroes",
  templateUrl: "./heroes.component.html",
  styleUrls: ["./heroes.component.scss"]
})
export class HeroesComponent implements OnInit {
  heroes;
  editingHero: Hero;

  constructor(private _heroService: HeroService) {
  }

  ngOnInit() {
    this.clear();
    this.getHeroes();
  }

  clear() {
    this.editingHero = {} as Hero;
  }

  add() {
    this._heroService.addHero(this.editingHero)
      .subscribe(h => {
        this.heroes.push(h);
        this.getHeroes();
      });
  }

  delete(hero: Hero) {
    this.heroes = this.heroes.filter(h => h !== hero);
    this._heroService.deleteHero(hero.id)
      .subscribe(h => this.getHeroes());
  }

  getHeroes() {
    this._heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

}
