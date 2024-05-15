export class Pokemon {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.sprite = data.sprites.front_default;
    this.statics = {
      hp: Math.floor((data.stats[0].base_stat / 255) * 100),
      attack: Math.floor((data.stats[1].base_stat / 190) * 100),
      defence: Math.floor((data.stats[2].base_stat / 250) * 100),
    };
  }
}
