import { Component, Input, OnInit } from "@angular/core";
import { Hero } from "../models/hero";
import { HeroService } from "../hero.service";

@Component({
  selector: "app-hero-rating",
  templateUrl: "./hero-rating.component.html",
  styleUrls: ["./hero-rating.component.scss"]
})
export class HeroRatingComponent implements OnInit {
  @Input() hero: Hero;
  constructor(private _heroService: HeroService) { }

  ngOnInit() {
  }

  suppress (ev: Event) {
    console.log("suppress: preventing propagation");
    ev.stopPropagation();
    ev.preventDefault();
  }

  rateHero(ev, rating: number) {
    console.log("rateHero: preventing propagation");
    ev.stopPropagation();
    ev.preventDefault();
    if (!this.hero) {
      return;
    }
    this.hero.rating = rating;
    if (!this.hero.id) {
      return;
    }
    this._heroService.saveHero(this.hero).subscribe();
  }
}
