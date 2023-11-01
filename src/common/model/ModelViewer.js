import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useRef, useState } from "react";
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

const ObjModelViewer = ({ object }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (object) {
      const viewWidth = containerRef.current.offsetWidth;

      const scene = new THREE.Scene();

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 1, 1);
      scene.add(directionalLight);

      const camera = new THREE.OrthographicCamera(
        viewWidth / -8,
        viewWidth / 8,
        viewWidth / 8,
        viewWidth / -8,
        1,
        500
      );
      camera.position.set(0, 0, 5);

      // Renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(new THREE.Color(0xf1f2f3));
      renderer.setSize(viewWidth, viewWidth);

      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(renderer.domElement);

      // Center model to scene
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      object.position.sub(center);

      scene.add(object);

      // Calculate the distance from the center of the model to the camera
      const distance = Math.max(size.x, size.y, size.z) * 2;

      // Set the camera's position outside the model's bounding box
      camera.position.copy(center).add(new THREE.Vector3(0, 0, distance));
      camera.lookAt(center);

      const controls = new OrbitControls(camera, renderer.domElement);

      controls.enablePan = true;
      controls.enableZoom = true;

      // controls.target.copy(center);
      controls.addEventListener("change", () => renderer.render(scene, camera));

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();
    }
  });

  return (
    <Box
      ref={containerRef}
      sx={{
        maxWidth: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    />
  );
};

const STLViewer = ({ geometry }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (geometry) {
      const viewWidth = containerRef.current.offsetWidth;

      const scene = new THREE.Scene();

      const camera = new THREE.OrthographicCamera(
        viewWidth / -8,
        viewWidth / 8,
        viewWidth / 8,
        viewWidth / -8,
        1,
        500
      );

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 1, 1);
      scene.add(directionalLight);

      // Renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(new THREE.Color(0xf1f2f3));
      renderer.setSize(viewWidth, viewWidth);

      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(renderer.domElement);

      const material = new THREE.MeshPhysicalMaterial({
        color: "white",
        roughness: 0.5,
      });

      const mesh = new THREE.Mesh(geometry, material);

      // Center model to scene
      const box = new THREE.Box3().setFromObject(mesh);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      mesh.position.sub(center);

      scene.add(mesh);

      // Calculate the distance from the center of the model to the camera
      const distance = Math.max(size.x, size.y, size.z) * 2;

      // Set the camera's position outside the model's bounding box
      camera.position.copy(center).add(new THREE.Vector3(0, 0, distance));
      camera.lookAt(center);

      const controls = new OrbitControls(camera, renderer.domElement);

      controls.enablePan = true;
      controls.enableZoom = true;

      controls.addEventListener("change", () => renderer.render(scene, camera));

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();
    }
  }, [geometry]);

  return (
    <Box
      ref={containerRef}
      sx={{
        // maxWidth: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    />
  );
};

export const ModelViewer = ({ file, color }) => {
  const [modelType, setModelType] = useState(null);
  const [geometry, setGeometry] = useState(null);

  useEffect(() => {}, []);

  useEffect(() => {
    if (file) {
      let loader = null;

      const fileExtension = getFileExtension(file.name);
      setModelType(fileExtension);

      switch (fileExtension) {
        case "stl":
          loader = new STLLoader();
          loader.load(URL.createObjectURL(file), (geometry) => {
            setGeometry(geometry);
          });

          break;

        case "obj":
          loader = new OBJLoader();
          loader.load(URL.createObjectURL(file), (geometry) => {
            setGeometry(geometry);
          });
          break;

        default:
      }
    }
  }, [file]);

  switch (modelType) {
    case "stl":
      return <STLViewer geometry={geometry} color={color} />;

    case "obj":
      return <ObjModelViewer object={geometry} color={color} />;

    default:
      return <></>;
  }
};
