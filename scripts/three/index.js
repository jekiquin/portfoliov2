const threeContainer = document.querySelector('.about__three');
const renderer = new THREE.WebGLRenderer({ alpha: true });

export const init = async () => {
  const height = threeContainer.offsetHeight;
  const width = threeContainer.offsetWidth;
  renderer.setSize(width, height);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(76, width / height, 0.1, 1000);

  await loadModel(scene, camera);
};

const loadModel = async (scene, camera) => {
  const loader = new THREE.GLTFLoader();
  const data = await loader.loadAsync('model/me.glb');

  const box = new THREE.Box3().setFromObject(data.scene);
  const center = new THREE.Vector3();
  box.getCenter(center);
  // data.scene.position.sub(center); // center the model

  scene.add(data.scene);
  const light = new THREE.AmbientLight(0xfefefe);
  light.castShadow = true;
  scene.add(light);

  camera.position.set(0, 1, 1.5);
  animate(scene, camera, data.scene);
};

function animate(scene, camera, model) {
  requestAnimationFrame(() => animate(scene, camera, model));
  model.rotation.y += 0.005;
  renderer.render(scene, camera);
}

export const initThreeScene = () => {
  threeContainer.append(renderer.domElement);
  init();
};
