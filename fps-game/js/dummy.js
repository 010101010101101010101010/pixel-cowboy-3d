export class Dummy {
  constructor() {
    this.hp = 100;
    this.xOffset = 0;
    this.damageText = null;
    this.damageTimer = 0;
  }

  hit(dmg) {
    this.hp -= dmg;
    this.xOffset = -10;

    this.damageText = dmg;
    this.damageTimer = 30;

    if (this.hp <= 0) {
      this.hp = 100;
    }
  }

  update() {
    this.xOffset *= 0.8;
    if (this.damageTimer > 0) this.damageTimer--;
  }
}