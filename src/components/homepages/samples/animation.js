import React from 'react'
import * as THREE from 'three'
import { FullHeroWrapper } from 'components/homepages/hero'
import textureImage from './texture.jpg'

class HomepageHero extends React.Component {

  animationRef = React.createRef()
  canvasRef = React.createRef()

  componentDidMount() {
    if (!this.animationRef.current) {
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    this.animationRef.current.appendChild(renderer.domElement)
    const geometry = new THREE.PlaneGeometry(5, 20, 32);
    const texture = new THREE.TextureLoader().load(textureImage);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const map = new THREE.Mesh(geometry, material);
    scene.add(map);

    camera.position.z = 5;

    var animate = function () {
      requestAnimationFrame(animate);

      map.rotation.x += 0.01;

      renderer.render(scene, camera);
    };

    animate();

  }

  render() {

    return (

      <FullHeroWrapper>
        <div style={{ width: '100%', height: '500px' }} ref={this.animationRef}></div>
        <canvas ref={this.canvasRef}></canvas>
      </FullHeroWrapper>
    )
  }

}

export default HomepageHero