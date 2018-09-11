let lastId = 0;

export class Hero {
  id: number;
  name: string;
  rating = 5;

  constructor(
    name?: string,
    id?: number) {
    this.id = id || ++lastId;
    this.name = name;
  }
}
