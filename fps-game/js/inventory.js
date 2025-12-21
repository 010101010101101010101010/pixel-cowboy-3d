export const inventory = {
  scopes: [],
  equippedScope: null,

  addScope(scope) {
    if (!this.scopes.includes(scope)) {
      this.scopes.push(scope);
    }
  },

  equip(scope) {
    if (this.scopes.includes(scope)) {
      this.equippedScope = scope;
    }
  }
};