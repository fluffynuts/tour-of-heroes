import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { HeroesComponent } from "../heroes/heroes.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { HeroDetailComponent } from "../hero-detail/hero-detail.component";

const routes: Route[] = [
  { path: "heroes", component: HeroesComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "detail/:id", component: HeroDetailComponent },
  { path: "**", redirectTo: "dashboard" }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
