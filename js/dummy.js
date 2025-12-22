// dummy.js
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152/build/three.module.js";

export function createDummy(){
  const g = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3,0.3,1.2),
    new THREE.MeshStandardMaterial({color:0x888888})
  );
  body.position.y = 0.6;

  const head = new THREE.Mesh(
    new THREE.SphereGeometry(0.25),
    new THREE.MeshStandardMaterial({color:0xaa6666})
  );
  head.position.y = 1.4;
  head.name = "head";

  g.add(body);
  g.add(head);

  g.userData.hp = 100;
  g.userData.hit = ()=>{
    g.rotation.y += 0.2;
    if(g.userData.hp<=0){
      g.userData.hp = 100;
      g.position.x = (Math.random()-0.5)*6;
    }
  };

  return g;
}