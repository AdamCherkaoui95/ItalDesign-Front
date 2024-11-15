import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-media3d',
  templateUrl: './media3-d.component.html',
  styleUrls: ['./media3-d.component.css']
})
export class Media3DComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() selectedTrack: any;  // Receive selected media

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private cube: THREE.Mesh | undefined;
  private animationFrameId: number | undefined;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.init3D();
  }

  private init3D() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.camera.position.z = 5;

    this.animate();
  }

  private animate() {
    if (this.cube) {
      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;
    }

    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.renderer.dispose();
  }

  ngOnChanges() { 
    if (this.cube && this.selectedTrack) {
      const material = this.cube.material as THREE.MeshBasicMaterial; // Explicitly cast to MeshBasicMaterial
      material.color.set(this.selectedTrack.type === 'audio' ? 0x00ff00 : 0x0000ff);
    }
  }
}
