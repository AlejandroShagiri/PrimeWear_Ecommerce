import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Mesh } from "three";
import { ArrowDown, Home } from "react-feather";

function ThreeDimLanding() {
  //THREE.js is 3d library for web design
  //has a lot of attributes that need to load for it to work
  // 3d model --> GLTF loader
  // scene
  // renderer
  // camera
  // lights

  //these are states that are changed in a chained manner so that all the
  //THREEJS scene is rendered properly

  //flag --> loading ----> flag -----> loading...

  const [initFlag, setInitFlag] = useState(true);

  const [sceneState, setSceneState] = useState(undefined);
  const [cameraState, setCameraState] = useState(undefined);
  const [rendererState, setRendererState] = useState(undefined);

  const [loadModelFlag, setLoadModelFlag] = useState(false);

  const [loadedModelState, setLoadedModelState] = useState(undefined);
  const [objectMeshesState, setObjectMeshesState] = useState(undefined);
  const [lightsState, setLightsState] = useState(undefined);

  const [addSceneObjectsFlag, setAddSceneObjectsFlag] = useState(false);

  const [appendToDOMFlag, setAppendToDOMFlag] = useState(false);

  //state for storing scroll values (not raw scroll val - they are modified beforehand)
  const [scroll, setScroll] = useState(Math.trunc(window.pageYOffset));

  //ref for THREEJS canvas div container
  const ref = useRef(null);
  const el2 = ref.current;

  //Utility that scrolls to top of page when the page is reloaded
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  //------------------------------------------------------
  //create Scene, Camera, and Renderer ---> save to states

  useEffect(() => {
    if ((!sceneState, !cameraState, !rendererState)) {
      const scene = new THREE.Scene();
      setSceneState(scene);

      const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        1000
      );
      camera.position.z = 100;
      setCameraState(camera);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      setRendererState(renderer);

      setInitFlag(false);
    }
  }, []);

  //add lights
  useEffect(() => {
    if ((sceneState, cameraState, rendererState, !initFlag)) {
      let tempScene = sceneState;
      const light = new THREE.AmbientLight(0x303040, 1); // soft white light
      const light2 = new THREE.PointLight(0xffffff, 3, 150);
      light2.position.set(50, 50, 20);
      const light3 = new THREE.PointLight(0xffffff, 1, 140);
      light3.position.set(-50, 50, 20);

      const light4 = new THREE.PointLight(0xffffff, 0, 300);
      light4.position.set(-20, -100, 40);

      tempScene.add(light);
      // tempScene.add( light2 );
      // tempScene.add( light3 );
      tempScene.add(light4);
      setLightsState(light4);
      setSceneState(tempScene);
      setLoadModelFlag(true);
    }
  }, [initFlag]);

  //load GLTF 3D model into THREE mesh obj + its texture and save to state
  useEffect(() => {
    //load model once at component start
    const loader = new GLTFLoader();
    loader.load("models/watch3.glb", (gltf) => {
      const geo = gltf.scene.children[0].geometry;
      const mat1 = gltf.scene.children[0].material;
      const mat = new THREE.MeshNormalMaterial();
      const newMesh = new THREE.Mesh(geo, mat1);
      newMesh.position.z = -15;
      newMesh.position.x = -5;
      newMesh.material.opacity = 1;
      setLoadedModelState(newMesh);
    });
  }, [loadModelFlag]);

  //The model is kind of off-center... so I needed to make a new
  //origin point... this is done by making a parent of the model that is where I want the
  //origin to be...
  //...otherwise it rotates ina skewed way
  useEffect(() => {
    if (loadedModelState) {
      let tempScene = sceneState;
      const pivot = new THREE.Object3D();
      pivot.rotation.z = +1.5708;
      pivot.add(loadedModelState);
      pivot.rotation.x = 3.14159;
      pivot.rotation.y = scroll / 39.2;
      pivot.position.z = 100 - scroll / 5 + 10;
      pivot.position.y = -5;

      setObjectMeshesState([pivot]);
      setAddSceneObjectsFlag(true);
    }
  }, [loadedModelState]);

  //-------this where some things are confusing...
  //-------you can update the sceneState without setting the state again...?
  useEffect(() => {
    if (addSceneObjectsFlag) {
      let tempScene = sceneState;
      objectMeshesState.forEach((obj) => {
        tempScene.add(obj);
      });
      setAppendToDOMFlag(true);
    }
  }, [addSceneObjectsFlag]);

  //-------append the renderer's canvas dom element to the el2 div
  useEffect(() => {
    if (appendToDOMFlag) {
      let tempRenderer = rendererState;
      tempRenderer.render(sceneState, cameraState);
      el2.appendChild(tempRenderer.domElement);
      setRendererState(tempRenderer);
    }
  }, [appendToDOMFlag]);

  //SCROLL----------------------------------------------------
  //--------scroll handler
  const handleScroll = () => {
    setScroll(Math.floor((window.pageYOffset / 140) * 10));
  };
  window.addEventListener("scroll", handleScroll);

  //update rotation on scroll change
  useEffect(() => {
    if (el2 && objectMeshesState) {
      let tempRenderer = rendererState;
      let tempPivot = sceneState.children[2];
      tempPivot.rotation.y = scroll / 39.6;
      tempPivot.position.z = 100 - scroll / 5 + 10;
      tempRenderer.render(sceneState, cameraState);
      lightsState.position.y = -150;
      if (scroll < 2) {
        lightsState.intensity = 0;
      } else {
        lightsState.intensity = scroll / 30 - 2;

        if (lightsState.intensity > 3) {
          lightsState.intensity = 3;
        }
      }
    }
  }, [scroll]);

  // this was to clear the states on exit... not sure it does anything though
  useEffect(() => {
    return () => {
      setRendererState();
      setCameraState();
      setSceneState();
      setObjectMeshesState();

      setAddSceneObjectsFlag();
      setInitFlag();
      setAppendToDOMFlag();
      setLoadModelFlag();
    };
  }, []);

  //Crazy noodle code for handling scroll positions and fade-ins

  const top = 1;
  const midTop = 0.7;
  const midBottom = 0.3;
  const bottom = 0;

  const ratio = Math.round(10 / ((top - midTop) * 10));
  const opacitycalc = (elY) => {
    const offset = elY;

    let offsetRaw = elY / window.innerHeight;

    let offetRes = 1;

    if (offsetRaw < top && offsetRaw >= midTop) {
      offetRes = (1 - offsetRaw) * ratio;
    } else if (offsetRaw < midTop && offsetRaw >= midBottom) {
      offetRes = 1;
    } else if (offsetRaw < midBottom && offsetRaw >= bottom) {
      offetRes = offsetRaw * ratio;
    } else {
      offetRes = 0;
    }
    return `${offetRes}`;
  };

  //setting a state for the position values // opacity conditions for fades
  const [tStyle, setTStyle] = useState([{}, {}, {}, {}, {}, {}]);

  useEffect(() => {
    if (el2) {
      let tempTStyle_1 = {
        opacity: opacitycalc(
          document.querySelector(".t1").getBoundingClientRect().y
        ),
      };
      let tempTStyle_2 = {
        opacity: opacitycalc(
          document.querySelector(".t2").getBoundingClientRect().y
        ),
      };
      let tempTStyle_3 = {
        opacity: opacitycalc(
          document.querySelector(".t3").getBoundingClientRect().y
        ),
      };
      let tempTStyle_4 = {
        opacity: opacitycalc(
          document.querySelector(".t4").getBoundingClientRect().y
        ),
      };
      let tempTStyle_5 = {
        opacity: opacitycalc(
          document.querySelector(".t5").getBoundingClientRect().y
        ),
      };
      let tempTStyle_6 = {
        opacity: opacitycalc(
          document.querySelector(".t5").getBoundingClientRect().y
        ),
      };
      setTStyle([
        tempTStyle_1,
        tempTStyle_2,
        tempTStyle_3,
        tempTStyle_4,
        tempTStyle_5,
        tempTStyle_6,
      ]);
    }
  }, [scroll]);

  //some additional style variables objects

  const windowStyle = {
    height: `${7550 + window.innerHeight / 5}px`,
  };
  const windowStyle_B = {
    height: `${7650 + window.innerHeight / 5}px`,
  };
  const t0 = {
    top: `${-40 + window.innerHeight / 2}px`,
  };

  const tArr = {
    top: `${5 + window.innerHeight / 2}px`,
    left: "50vw",
  };

  const buttonS = {
    top: `${7550 + window.innerHeight / 5}px`,
  };

  const navigate = useNavigate();

  //click handleer for home button and scrolls to top
  const handleClick = () => {
    navigate("/Home");
    window.scrollTo(0, 0);
  };

  return (
    <APP>
      <Button style={buttonS} onClick={handleClick}>
        <Home />
      </Button>
      <Wrapper style={windowStyle}>
        <Black style={windowStyle_B} />
        <Div ref={ref} id={"this"} className="three-canvas"></Div>
        <div className="img"></div>

        <TitleScrolls style={t0} className="t0">
          Welcome
        </TitleScrolls>
        <ArrowDownStyle style={tArr} className="tArr" />
        <TitleScrolls style={tStyle[0]} className="t1">
          Your world moves fast...
        </TitleScrolls>
        <TitleScrolls style={tStyle[1]} className="t2">
          So keep up with it.
        </TitleScrolls>
        <TitleScrolls style={tStyle[2]} className="t3">
          Using the very best of Wearable Technology
        </TitleScrolls>
        <TitleScrolls style={tStyle[3]} className="t4">
          Your new point of contact
        </TitleScrolls>

        <TitleScrolls style={tStyle[5]} className="t6">
          PRIME
        </TitleScrolls>
        <TitleScrolls style={tStyle[4]} className="t5">
          WEAR
        </TitleScrolls>
      </Wrapper>
    </APP>
  );
}

const Black = styled.div`
  background-color: black;
  height: 7400px;
  width: 100vw;
  position: absolute;
  top: 0;
  z-index: 1;
  overflow-x: hidden;
`;

const APP = styled.div`
  height: 7300px;
  width: 100vw;

  overflow-y: hidden;
  background-color: black;
  overflow-x: hidden;
`;

const ArrowDownStyle = styled(ArrowDown)`
  color: white;
  z-index: 100;
  background-color: transparent;
  position: absolute;
  left: 49vw;

  @keyframes example {
    0% {
      opacity: 0%;
    }
    80% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
  // animation-delay: 250ms;
  animation-name: example;
  animation-duration: 8s;
`;
const TitleScrolls = styled.h1`
  color: white;
  z-index: 100;
  background-color: transparent;
  position: absolute;
  font-size: 40px;

  div {
    width: 100px;
    height: 100px;
    background-color: red;
    animation-name: example;
    animation-duration: 4s;
  }

  @keyframes example {
    from {
      opacity: 0%;
    }
    to {
      opacity: 100%;
    }
  }

  &.t0 {
    left: 40vw;
    animation-name: example;
    animation-duration: 4s;
  }
  &.tArr {
    animation-name: example;
    animation-duration: 4s;
    color: red;
  }

  &.t1 {
    top: 1000px;
    left: 15vw;
    color: white;
    font-size: 60px;
  }

  &.t2 {
    top: 3000px;
    left: 20vw;
    font-size: 50px;

    color: white;
  }

  &.t3 {
    top: 4500px;
    left: 15vw;

    color: white;
    font-size: 105px;
  }

  &.t4 {
    top: 7060px;
    left: 10vw;

    color: white;
    font-size: 40px;
  }

  &.t5 {
    top: 7360px;
    left: -3vw;
    z-index: 4;
    margin-bottom: 800px;
    color: white;
    font-size: 35vw;
  }


  &.t6 {
    top: 7070px;
    left: -5vw;
    z-index: 4;
    color: white;
    font-size: 35vw;
  }
`;
const Button = styled.button`
  position: absolute;
  left: 3vw;
  width: 50px;
  height: 40px;
  border: none;
  z-index: 200;
  border-radius: 5px;
  &:hover {
    background-color: turquoise;
  }
`;


const Div = styled.div`
  position: fixed;
  top: 0;
`;

const Wrapper = styled.div`
  height: 7300px;
  width: 100vw;
  background-color: black;
  // overflow-y: hidden;
  overflow-x: hidden;

  z-index: 80;

  .three-canvas {
    z-index: 100;
  }
`;

export default ThreeDimLanding;
