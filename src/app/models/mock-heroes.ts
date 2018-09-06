import { Hero } from "./hero";
export const Heroes = [
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
