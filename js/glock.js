// glock.js
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.152/build/three.module.js";

export class Glock {
  constructor(camera, listener){
    this.camera = camera;
    this.ammo = 17;
    this.maxAmmo = 17;
    this.reloading = false;

    // 🔫 총 본체
    this.group = new THREE.Group();

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.25,0.12,0.6),
      new THREE.MeshStandardMaterial({color:0x222222})
    );

    // 슬라이드
    this.slide = new THREE.Mesh(
      new THREE.BoxGeometry(0.26,0.09,0.35),
      new THREE.MeshStandardMaterial({color:0x111111})
    );
    this.slide.position.y = 0.07;
    this.slide.position.z = -0.05;

    body.add(this.slide);
    this.group.add(body);

    this.group.position.set(0.15,-0.15,-0.5);
    camera.add(this.group);

    // 🔥 머즐 플래시
    this.muzzle = new THREE.Mesh(
      new THREE.PlaneGeometry(0.2,0.2),
      new THREE.MeshBasicMaterial({
        color:0xffaa33,
        transparent:true,
        opacity:0
      })
    );
    this.muzzle.position.set(0,-0.02,-0.45);
    camera.add(this.muzzle);

    // 🔊 사운드
    this.fireSound = new THREE.Audio(listener);
    this.reloadSound = new THREE.Audio(listener);
    const loader = new THREE.AudioLoader();

    loader.load("assets/sounds/glock_fire.mp3",b=>this.fireSound.setBuffer(b));
    loader.load("assets/sounds/glock_reload.mp3",b=>this.reloadSound.setBuffer(b));
  }

  shoot(raycaster, targets){
    if(this.reloading || this.ammo<=0) return;
    this.ammo--;

    // 🔥 머즐
    this.muzzle.material.opacity = 1;
    setTimeout(()=>this.muzzle.material.opacity=0,40);

    // 🔁 슬라이드 후퇴
    this.slide.position.z = -0.12;
    setTimeout(()=>this.slide.position.z=-0.05,60);

    // 🔊 사운드
    if(this.fireSound.isPlaying) this.fireSound.stop();
    this.fireSound.play();

    // 🎯 히트 판정
    raycaster.setFromCamera(new THREE.Vector2(0,0), this.camera);
    const hit = raycaster.intersectObjects(targets,true);

    if(hit.length){
      const obj = hit[0].object;
      let dmg = 18 + Math.random()*6;
      if(obj.name==="head") dmg*=2;
      obj.parent.userData.hp -= dmg;
      obj.parent.userData.hit();
    }

    // 🔄 탄 다 쓰면 장전
    if(this.ammo<=0) this.reload();
  }

  reload(){
    if(this.reloading) return;
    this.reloading = true;
    this.reloadSound.play();

    let t = 0;
    const startY = this.group.position.y;
    const anim = setInterval(()=>{
      t+=0.1;
      this.group.position.y = startY - Math.sin(t)*0.05;
      if(t>=Math.PI){
        this.group.position.y = startY;
        this.ammo = this.maxAmmo;
        this.reloading = false;
        clearInterval(anim);
      }
    },16);
  }
}