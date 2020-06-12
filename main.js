let scene, camera, renderer, controls, model, hemiLight, spotLight;

window.onload=function(){
  var musicGlyph = document.querySelector(".glyph");
    musicGlyph.addEventListener("click", () => {
      if (musicGlyph.classList.contains("glyph-switch")) {
        musicGlyph.src = "glyphs/sound-no.svg";
        document.querySelector("audio").pause();
      }
      else{
        musicGlyph.src="glyphs/sound.svg";
        document.querySelector("audio").play();
      }
      musicGlyph.classList.toggle("glyph-switch");
    });
  };


function init() {
  //music
  

  //music done
  scene = new THREE.Scene();
  container = document.querySelector(".right-cont");
  var w = container.offsetWidth;
  var h = container.offsetHeight;
  camera = new THREE.PerspectiveCamera(60, w / h, 1, 5000);
  camera.position.set(20, 15, 155);
  camera.zoom = 0.2;
  //scene.add(new THREE.AxesHelper(500));
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  renderer.setSize(w, h);
  container.appendChild(renderer.domElement);

  //set up lights : hemispherical light

  hemiLight = new THREE.HemisphereLight();
  scene.add(hemiLight);

  //set up lights : spot lights

  spotLight = new THREE.SpotLight(0xffa95c, 18);
  //spotLight.castShadow = true;
  spotLight.position.set(-10, -10, -10);
  scene.add(spotLight);

  //tone mapping
  renderer.toneMapping = THREE.CineonToneMapping;
  renderer.toneMappingExposure = 1.2;

  //model upload
  renderer.shadowMap.enabled = true;

  //add button listeners
  renderer.domElement.addEventListener("click", function () {
    cancelAnim();
  });

  new THREE.GLTFLoader().load(`model/scene.gltf`, (result) => {
    model = result.scene.children[0];
    model.scale.setScalar(0.1);
    model.position.set(0, 0, 0);

    scene.add(model);
    animate();
  });
  animate();
}
var time = 0;
function animate() {
  renderer.render(scene, camera);
  model.rotation.z = Math.sin(time);
  time = time + 0.03;

  spotLight.position.set(
    camera.position.x + 10,
    camera.position.y + 10,
    camera.position.z + 10
  );

  requestAnimationFrame(animate);
}
init();

//music
