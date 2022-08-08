// import './App.css';
// import React, { useRef, useState,useEffect } from 'react'
// import { Canvas, useFrame, useThree } from '@react-three/fiber'
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import * as THREE from "three";

// const CameraController = () => {
//   const { camera, gl } = useThree();
//   useEffect(
//      () => {
//         const controls = new OrbitControls(camera, gl.domElement);
//         controls.minDistance = 0.1;
//         controls.maxDistance =5;
//         return () => {
//           controls.dispose();
//         };
//      },
//      [camera, gl]
//   );
//   return null;
// };

// function Box(props) {
//   console.log(props)
//   return (
//     <mesh position={props.position}>
//         <boxGeometry args={props.dimensions} />
//         <meshLambertMaterial color={props.color}  />
//       </mesh>
//   );
// }
// function Cylinder(props) {
//   console.log(props)
//   return (
//     <mesh position={props.position}>
//         <cylinderGeometry args={props.dimensions} />
//         <meshLambertMaterial color={props.color}  />
//       </mesh>
//   );
// }

// function App() {
//   return (
//     <Canvas>
//     <CameraController />
//     <ambientLight />
//     <pointLight position={[10, 10, 10]} />
//     <Box position={[5, 6, 2]} dimensions={[10, 12, 15]} color={"grey"}  />
//       <Box position={[20, 2.5, 1]} dimensions={[20, 5, 10]} color={"orange"}  />
//       {/* <Box position={[35, 1.5, 0]} dimensions={[10, 3, 8]} color={"rgb(164,120,83)"} /> */}
//       <Box position={[15, 7.5, 0]} dimensions={[10, 5, 8]} color={"red"}   />
//       <Box position={[25, 7.5, 0]} dimensions={[10, 5, 8]} color={"rgb(176,187,184)"}   />
//       <Box position={[20, 7.5, 8]} dimensions={[20, 15, 4]} color={"rgb(164,115,82)"}   />
//       <Box position={[5, 7.5, -8]} dimensions={[10, 15, 4]} color={"rgb(164,120,83)"} />
//       <Box position={[25, 7.5, -7]} dimensions={[10, 15, 6]} color={"grey"}   />
//       <Box position={[15, 10, -7]} dimensions={[10, 20, 6]} color={"rgb(176,187,184)"}   />

//       <Box position={[50, 2, 0]} dimensions={[10, 4, 20]} color={"rgb(176,187,184)"}   />
//       <Box position={[50, 6, 0]} dimensions={[10, 4, 20]} color={"rgb(176,187,184)"}   />
//       <Box position={[50, 10, 0]} dimensions={[10, 4, 20]} color={"rgb(176,187,184)"}   />

//       <Cylinder position={[34,6,-7]} dimensions={[3.5,3.5, 12]} color={"hotpink"}  />
//       <Cylinder position={[34,6,0]} dimensions={[3.5,3.5, 12]} color={"hotpink"}  />
//       <Cylinder position={[34,6,7]} dimensions={[3.5,3.5, 12]} color={"hotpink"}  />
//       <Cylinder position={[41,6,-7]} dimensions={[3.5,3.5, 12]} color={"rgb(164,115,82)"}  />
//       <Cylinder position={[41,6,0]} dimensions={[3.5,3.5, 12]} color={"rgb(164,115,82)"}  />
//       <Cylinder position={[41,6,7]} dimensions={[3.5,3.5, 12]} color={"rgb(164,115,82)"}  />
//   </Canvas>
//   );
// }

// export default App;

import React, { Component } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const boxes = [
  {
    position: [5, 6, 2],
    dimensions: [10, 12, 15],
    color: "grey",
  },
  {
    position: [20, 2.5, 1],
    dimensions: [20, 5, 10],
    color: "orange",
  },
  {
    position: [15, 7.5, 0],
    dimensions: [10, 5, 8],
    color: "pink",
  },
  {
    position: [25, 7.5, 0],
    dimensions: [10, 5, 8],
    color: "blue",
  },
  {
    position: [20, 7.5, 8],
    dimensions: [10, 5, 8],
    color: "yellow",
  },
];
class App extends Component {
  componentDidMount = () => {
    this.sceneSetup();
    this.addCustomSceneObjects();
    this.startAnimationLoop();
  };
  addCustomSceneObjects = () => {
    // this.cube = new THREE.Mesh( geometry, material );
    // this.scene.add( this.cube );
    // this.cube2 = new THREE.Mesh( geometry, material );
    // this.cube2.position.set(4,0,0)
    // this.scene.add( this.cube2 );
    // this.cube3 = new THREE.Mesh( geometry, material );
    // this.cube3.position.set(8,0,0)
    // this.scene.add( this.cube3 );
    for (let i = 0; i < boxes.length; i++) {
      const geometry = new THREE.BoxGeometry(
        boxes[i].dimensions[0],
        boxes[i].dimensions[1],
        boxes[i].dimensions[2]
      );
      const material = new THREE.MeshPhongMaterial({
        color: boxes[i].color,
        emissive: 0x072534,
        side: THREE.DoubleSide,
        flatShading: true,
      });
      this.cube2 = new THREE.Mesh(geometry, material);
      this.cube2.position.set(
        boxes[i].position[0],
        boxes[i].position[1],
        boxes[i].position[2]
      );
      this.scene.add(this.cube2);
    }

    const lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);

    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);
  };
  startAnimationLoop = () => {
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
    this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
  };
  sceneSetup = () => {
    // get container dimensions and use them for scene sizing
    const width = this.el.clientWidth;
    const height = this.el.clientHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, // fov = field of view
      width / height, // aspect ratio
      0.1, // near plane
      1000 // far plane
    );
    this.controls = new OrbitControls(this.camera, this.el);
    // set some distance from a cube that is located at z = 0
    this.camera.position.z = 75;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.el.appendChild(this.renderer.domElement); // mount using React ref
  };
  render() {
    return (
      <div
        ref={(ref) => (this.el = ref)}
        style={{ width: "600px", height: "500px" }}
      />
    );
  }
}

export default App;
