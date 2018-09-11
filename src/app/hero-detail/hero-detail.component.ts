import { Component, OnInit, Input, } from "@angular/core";
import {Hero} from "../models/hero";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-hero-detail",
  templateUrl: "./hero-detail.component.html",
  styleUrls: ["./hero-detail.component.scss"]
})
export class HeroDetailComponent implements OnInit {
  @Input()
  hero: Hero;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _heroService: HeroService,
    private _location: Location
  ) {
  }

  ngOnInit() {
    this._loadHero();
  }

  public goBack() {
    this._location.back();
  }

  public save() {
    this._heroService.saveHero(this.hero)
      .subscribe(() => this.goBack());
  }

  private _loadHero() {
    this._activatedRoute.paramMap.subscribe(map => {
      const id = parseInt(map.get("id"), 10);
      if (isNaN(id)) {
        return;
      }
      this._heroService.getHero(id).subscribe(
        hero => this.hero = hero
      );
    });
  }
}
