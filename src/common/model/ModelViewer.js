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

const ObjModelViewer = ({ file }) => {
  const containerRef = useRef();

  useEffect(() => {
    let renderer = null;

    if (file) {
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
      camera.position.set(0, 0, 5);

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

      // Renderer
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setClearColor(new THREE.Color("gray"));
      renderer.setSize(viewWidth, viewWidth);

      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(renderer.domElement);

      const loader = new OBJLoader();
      loader.load(URL.createObjectURL(file), (model) => {
        console.log("*** OBJ Loaded ***", file.name, model);

        // Center model to scene
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.sub(center);

        scene.add(model);

        // Calculate the distance from the center of the model to the camera
        const distance = Math.max(size.x, size.y, size.z) * 2;

        // Set the camera's position outside the model's bounding box
        camera.position.copy(center).add(new THREE.Vector3(0, 0, distance));
        camera.lookAt(center);

        const controls = new OrbitControls(camera, renderer.domElement);

        controls.enablePan = true;
        controls.enableZoom = true;

        // controls.target.copy(center);
        controls.addEventListener("change", () =>
          renderer.render(scene, camera)
        );

        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };

        animate();
      });
    }

    return () => {
      renderer?.dispose();
    };
  }, [file]);

  return (
    <Box
      ref={containerRef}
      sx={{
        // maxWidth: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    />
  );
};

const STLViewer = ({ file }) => {
  const containerRef = useRef();

  useEffect(() => {
    let renderer = null;

    if (file) {
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

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setClearColor(new THREE.Color("gray"));
      renderer.setSize(viewWidth, viewWidth);

      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(renderer.domElement);

      const loader = new STLLoader();
      loader.load(URL.createObjectURL(file), (model) => {
        console.log("*** STL Loaded ***", file.name, model);

        const material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          roughness: 0.35,
        });

        const mesh = new THREE.Mesh(model, material);

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
        controls.enableRotate = true;

        controls.addEventListener("change", () =>
          renderer.render(scene, camera)
        );

        const animate = () => {
          requestAnimationFrame(animate);
          renderer.render(scene, camera);
        };

        animate();
      });
    }

    return () => {
      renderer?.dispose();
    };
  }, [file]);

  return (
    <Box
      ref={containerRef}
      sx={{
        // maxWidth: 300,
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

  useEffect(() => {}, []);

  useEffect(() => {
    if (file) {
      const fileExtension = getFileExtension(file.name);
      setModelType(fileExtension);
    }
  }, [file]);

  switch (modelType) {
    case "stl":
      return <STLViewer file={file} color={color} />;

    case "obj":
      return <ObjModelViewer file={file} color={color} />;

    default:
      return <></>;
  }
};
