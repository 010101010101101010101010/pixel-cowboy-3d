import { inventory } from "./inventory.js";

export let fov = 90;

export function updateFOV() {
  if (!inventory.equippedScope) {
    fov = 90;
  } else if (inventory.equippedScope === "Red Dot") {
    fov = 70;
  } else if (inventory.equippedScope === "2x Scope") {
    fov = 55;
  } else if (inventory.equippedScope === "4x Scope") {
    fov = 40;
  }
}