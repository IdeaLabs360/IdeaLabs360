import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useCallback, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const getFileExtension = (fileName) => {
  if (fileName) {
    const lastDotIndex = fileName.lastIndexOf(".");
    if (lastDotIndex !== -1) {
      return fileName.slice(lastDotIndex + 1);
    } else {
      return "";
    }
  } else {
    return "";
  }
};

const loadObjModel = (file, viewWidth, viewHeight, color, onLoad) => {
  const loader = new OBJLoader();
  loader.load(URL.createObjectURL(file), (model) => {
    const boundingBox = new THREE.Box3().setFromObject(model);

    const modelWidth = boundingBox.max.x - boundingBox.min.x;
    const modelHeight = boundingBox.max.y - boundingBox.min.y;

    // Determine the scale factor based on view size
    const maxWidth = viewWidth * 0.2;
    const maxHeight = viewHeight * 0.2;
    const scale = Math.min(maxWidth / modelWidth, maxHeight / modelHeight); // Maintain aspect ratio

    model.scale.set(scale, scale, scale);

    const material = new THREE.MeshPhysicalMaterial({
      color: color,
      roughness: 0.35,
    });

    model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });

    const center = boundingBox.getCenter(new THREE.Vector3());
    model.position.sub(center);

    onLoad(model, boundingBox, center);
  });
};

const loadSTLModel = (file, viewWidth, viewHeight, color, onLoad) => {
  const loader = new STLLoader();
  loader.load(URL.createObjectURL(file), (model) => {
    const box = new THREE.Box3().setFromObject(new THREE.Mesh(model));

    // Calculate the model's dimensions
    const modelWidth = box.max.x - box.min.x;
    const modelHeight = box.max.y - box.min.y;

    // Determine the scale factor based on window size
    const maxWidth = viewWidth * 0.2;
    const maxHeight = viewHeight * 0.2;
    const scale = Math.min(maxWidth / modelWidth, maxHeight / modelHeight); // Maintain aspect ratio

    // Set the model's scale
    model.scale(scale, scale, scale);

    const material = new THREE.MeshPhysicalMaterial({
      color: color,
      roughness: 0.35,
    });

    const mesh = new THREE.Mesh(model, material);
    const boundingBox = new THREE.Box3().setFromObject(mesh);
    const center = boundingBox.getCenter(new THREE.Vector3());
    mesh.position.sub(center);

    onLoad(mesh, boundingBox, center);
  });

  console.log("Nothing to load");
};

export const ModelViewer = ({ file, color }) => {
  const containerRef = useRef();

  const [renderer, setRenderer] = useState(null);
  const [viewWidth, setViewWidth] = useState(null);
  const [viewHeight, setViewHeight] = useState(null);
  // const [isRotating, setIsRotating] = useState(true);

  const onLoad = useCallback(
    (model, boundingBox, center) => {
      if (renderer?.domElement) {
        const scene = new THREE.Scene();

        const ambientLight = new THREE.AmbientLight(0xffffff);
        scene.add(ambientLight);

        const light1 = new THREE.DirectionalLight(0xffffff, 1); // From the front
        light1.position.set(0, 0, 1);
        scene.add(light1);

        const light2 = new THREE.DirectionalLight(0xffffff, 1); // From the back
        light2.position.set(0, 0, -1);
        scene.add(light2);

        const light3 = new THREE.DirectionalLight(0xffffff, 1); // From the left
        light3.position.set(-1, 0, 0);
        scene.add(light3);

        const light4 = new THREE.DirectionalLight(0xffffff, 1); // From the right
        light4.position.set(1, 0, 0);
        scene.add(light4);

        scene.add(model);

        const size = boundingBox.getSize(new THREE.Vector3());
        const maxSize = Math.max(size.x, size.y, size.z);
        const distance = maxSize * 4;

        const frustumRatio = 1;
        const camera = new THREE.OrthographicCamera(
          maxSize / -frustumRatio,
          maxSize / frustumRatio,
          maxSize / frustumRatio,
          maxSize / -frustumRatio,
          0.1,
          10000
        );

        // Set the camera's position outside the model's bounding box
        camera.position.copy(center).add(new THREE.Vector3(0, 0, distance));
        camera.lookAt(scene.position);

        containerRef.current.innerHTML = "";
        containerRef.current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enablePan = true;
        controls.enableZoom = true;
        controls.enableRotate = true;

        const animate = () => {
          requestAnimationFrame(animate);
          controls.update();

          // if (isRotating) {
          //   model.rotation.y += 0.01;
          // }

          renderer.render(scene, camera);
        };

        animate();
      }
    },
    [renderer]
  );

  useEffect(() => {
    const viewWidth = containerRef.current.offsetWidth;
    const viewHeight = viewWidth;

    setViewWidth(viewWidth);
    setViewHeight(viewWidth);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(new THREE.Color(0x899499));
    renderer.setSize(viewWidth, viewHeight);
    setRenderer(renderer);

    return () => {
      renderer?.dispose();
    };
  }, []);

  useEffect(() => {
    if (file && viewWidth) {
      const fileExtension = getFileExtension(file.name);

      switch (fileExtension) {
        case "stl":
          loadSTLModel(file, viewWidth, viewHeight, color, onLoad);
          break;

        case "obj":
          loadObjModel(file, viewWidth, viewHeight, color, onLoad);
          break;

        default:
      }
    }
  }, [file, viewWidth, viewHeight, color, onLoad]);

  return (
    <Box
      ref={containerRef}
      sx={{
        // maxWidth: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    />
  );
};
