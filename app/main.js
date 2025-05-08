// SCENĂ
// Crează o nouă scenă în care vor fi adăugate obiectele 3D
const scene = new THREE.Scene();

// CAMERĂ
// Crează o cameră de tip PerspectiveCamera, cu un câmp de vizualizare de 75 de grade
// și un raport de aspect corespunzător dimensiunii ferestrei
// Camera are o distanță de tăiere între 0.1 și 1000 unități
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Poziționează camera pe axa Z pentru a putea observa scena
camera.position.z = 100;

// RENDERER
// Crează un renderer WebGL care va reda scena pe un canvas HTML
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("scene"), antialias: true });
// Setează dimensiunea renderer-ului la dimensiunile ferestrei browser-ului
renderer.setSize(window.innerWidth, window.innerHeight);
// Activează shadowMap pentru a permite umbre
renderer.shadowMap.enabled = true;
// Adaugă elementul renderer-ului în corpul paginii
document.body.appendChild(renderer.domElement);

// ÎNCĂRCARE TEXTURI
// Crează un loader pentru texturi
const textureLoader = new THREE.TextureLoader();

const textures = {
  sun: textureLoader.load('/textures/2k_sun.jpg'),
  mercury: textureLoader.load('/textures/2k_mercury.jpg'),
  venus: textureLoader.load('/textures/2k_venus_atmosphere.jpg'),
  earth: textureLoader.load('/textures/2k_earth_daymap.jpg'),
  mars: textureLoader.load('/textures/2k_mars.jpg'),
  jupiter:textureLoader.load('/textures/2k_jupiter.jpg'),
  saturn: textureLoader.load('/textures/2k_saturn.jpg'),
  saturnRing: textureLoader.load('/textures/8k_saturnr.png'),
  uranus: textureLoader.load('/textures/2k_uranus.jpg'),
  neptune: textureLoader.load('/textures/2k_neptune.jpg'),
};

// SOARE
// Crează geometria pentru Soare folosind o sferă cu rază de 5 unități și o diviziune de 32 pe 32
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
// Crează materialul Soarelui, utilizând textura și emissivă pentru efect de strălucire
const sunMaterial = new THREE.MeshBasicMaterial({ 
  map: textures.sun,
  emissive: 0xffff00,
  emissiveIntensity: 0.5
});
// Crează obiectul 3D al Soarelui folosind geometria și materialul definite
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
// Poziționează Soarele la coordonatele (0, 0, 0)
sun.position.set(0, 0, 0);
// Adaugă Soarele în scenă
scene.add(sun);

// PLANETE
const planets = [
  {
    name: "Mercur",
    radius: 2,
    distance: 15,
    color: 0xaaaaaa,
    speed: 0.0003,
    texture: textures.mercury,
    description: "Mercur este cea mai apropiată planetă de Soare și nu are atmosferă.",
    facts: [
      "O zi pe Mercur durează aproximativ 59 de zile pământești.",
      "Mercur are o atmosferă extrem de subțire, aproape inexistentă.",
      "Temperatura variază extrem, de la 430°C ziua până la -180°C noaptea."
    ]
  },
  {
    name: "Venus",
    radius: 3,
    distance: 25,
    color: 0xffcc00,
    speed: 0.00025,
    texture: textures.venus,
    description: "Venus este cunoscută pentru atmosfera sa densă și căldura extremă.",
    facts: [
      "Venus este cea mai fierbinte planetă din sistemul solar, cu temperaturi de până la 470°C.",
      "Se rotește în direcția opusă față de majoritatea planetelor.",
      "Atmosfera sa este de 90 de ori mai densă decât cea a Pământului."
    ]
  },
  {
    name: "Pământ",
    radius: 4,
    distance: 35,
    color: 0x00aaff,
    speed: 0.0002,
    texture: textures.earth,
    description: "Pământul este singura planetă cunoscută care susține viață.",
    facts: [
      "Este singura planetă cunoscută care găzduiește viață.",
      "Aproximativ 71% din suprafața sa este acoperită de apă.",
      "Câmpul magnetic al Pământului ne protejează de radiațiile solare nocive."
    ]
  },
  {
    name: "Marte",
    radius: 3,
    distance: 45,
    color: 0xff6347,
    speed: 0.00015,
    texture: textures.mars,
    description: "Marte este cunoscută ca și 'Planeta Roșie' datorită solului său bogat în oxid de fier.",
    facts: [
      "Are cel mai înalt munte din sistemul solar - Olympus Mons (21 km înălțime).",
      "Marțienii ar experimenta anotimpuri similare cu cele de pe Pământ.",
      "Are două luni mici: Phobos și Deimos."
    ]
  },
  {
    name: "Jupiter",
    radius: 7,
    distance: 60,
    color: 0xffcc99,
    speed: 0.0001,
    texture: textures.jupiter,
    description: "Jupiter este cea mai mare planetă din sistemul nostru solar.",
    facts: [
      "Ar putea încăpea de 1.300 de ori volumul Pământului.",
      "Marea Pată Roșie este o furtună care durează de cel puțin 400 de ani.",
      "Are cel puțin 79 de luni cunoscute."
    ]
  },
  {
    name: "Saturn",
    radius: 6,
    distance: 75,
    color: 0xffcc00,
    speed: 0.00008,
    texture: textures.saturn,
    ringTexture: textures.saturnRing,
    hasRings: true,
    description: "Saturn este celebru pentru inelele sale, formate din gheață și praf.",
    facts: [
      "Inelele sale se întind pe o distanță de 282.000 km, dar au doar câțiva metri grosime.",
      "Este atât de puțin dens încât ar pluti în apă (dacă ar exista un ocean suficient de mare).",
      "O zi pe Saturn durează doar 10,7 ore pământești."
    ]
  },
  {
    name: "Uranus",
    radius: 4,
    distance: 90,
    color: 0x00ffff,
    speed: 0.00006,
    texture: textures.uranus,
    description: "Uranus are o axă de rotație unică, aproape paralelă cu planul orbitei sale.",
    facts: [
      "Se rotește pe lateral, ca o bilă care se rostogolește.",
      "Este singura planetă numită după o zeitate greacă, nu romană.",
      "Are cel mai rece sistem atmosferic din sistemul solar, cu temperaturi de -224°C."
    ]
  },
  {
    name: "Neptun",
    radius: 4,
    distance: 110,
    color: 0x0000ff,
    speed: 0.00005,
    texture: textures.neptune,
    description: "Neptun este o planetă albastră, cunoscută pentru vânturile sale puternice.",
    facts: [
      "Vânturile pe Neptun pot atinge 2.100 km/h, cele mai rapide din sistemul solar.",
      "A fost descoperită prin calcule matematice înainte de a fi observată.",
      "O zi pe Neptun durează aproximativ 16 ore pământești."
    ]
  }
];

// GRUPURI DE PLANETE
// Creăm grupuri pentru fiecare planetă pentru a gestiona mai ușor inelele și alte elemente asociate
const planetGroups = [];

// Creare planete
// Parcurge lista de planete pentru a crea fiecare planetă și adaugă-o în scenă
const planetMeshes = planets.map(planet => {
  // Crează un grup pentru această planetă
  const planetGroup = new THREE.Group();
  planetGroups.push(planetGroup);
  
  // Crează geometria pentru fiecare planetă, folosind sferă cu rază variabilă
  const geometry = new THREE.SphereGeometry(planet.radius, 32, 32);
  
  // Crează materialul pentru planetă, folosind textura specificată
  const material = new THREE.MeshStandardMaterial({ 
    map: planet.texture,
    roughness: 0.8,
    metalness: 0.1
  });
  
  // Crează obiectul 3D al planetei folosind geometria și materialul
  const planetMesh = new THREE.Mesh(geometry, material);
  // Adaugă planeta în grupul său
  planetGroup.add(planetMesh);
  
  // Dacă planeta are inele (Saturn), le adăugăm
  if (planet.hasRings) {
    // Crează geometria inelului
    const ringGeometry = new THREE.RingGeometry(
      planet.radius * 1.5,  // raza interioară
      planet.radius * 2.5,  // raza exterioară
      64  // segmente
    );
    
    // Crează materialul inelului cu transparență
    const ringMaterial = new THREE.MeshStandardMaterial({
      map: planet.ringTexture,
      side: THREE.DoubleSide,
      transparent: true,
      alphaTest: 0.5,  // Adăugăm alphaTest pentru a evita artefacte de rendering
      opacity: 1.0 
    });
    
    // Crează mesh-ul inelului
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    // Rotim inelul pentru a-l poziționa corect (pe orizontală)
    ring.rotation.x = Math.PI / 2;
    // Adăugăm inelul în grupul planetei
    planetGroup.add(ring);
  }
  
  // Poziționează grupul planetei la o distanță specificată pe axa X
  planetGroup.position.set(planet.distance, 0, 0);
  // Adaugă grupul planetei în scenă
  scene.add(planetGroup);
  
  // Returnează obiectul planetei și grupul său pentru a-l utiliza mai departe
  return { planetMesh, planetGroup, planet };
});

// LUMINI
// Crează o lumină punctuală (lumina care radiază uniform într-un punct) pentru Soare
const sunLight = new THREE.PointLight(0xffffff, 1, 500);
// Poziționează lumina Soarelui în centrul scenei
sunLight.position.set(0, 0, 0);
// Permite luminii să genereze umbre
sunLight.castShadow = true;
// Adaugă lumina în scenă
scene.add(sunLight);

// Crează o lumină direcțională, care simulează lumina Soarelui
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// Poziționează lumina direcțională într-o direcție specifică
directionalLight.position.set(0, 50, 50);
// Permite luminii direcționale să genereze umbre
directionalLight.castShadow = true;
// Adaugă lumina direcțională în scenă
scene.add(directionalLight);

// Adaugă o lumină ambientală pentru a ilumina toate obiectele uniform
const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
scene.add(ambientLight);

// STELE
// Crează geometria pentru stele folosind un buffer de poziții
const starsGeometry = new THREE.BufferGeometry();
// Definirea numărului de stele
const starCount = 200;
// Creează un array de poziții random pentru stele
const positions = [];
for (let i = 0; i < starCount; i++) {
  positions.push(Math.random() * 200 - 100); // X
  positions.push(Math.random() * 200 - 100); // Y
  positions.push(Math.random() * 200 - 100); // Z
}
// Setează pozițiile stelelor în geometria buffer
starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
// Crează materialul pentru stele (puncte mici de culoare albă)
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3 });
// Creează un obiect Points pentru stele
const stars = new THREE.Points(starsGeometry, starsMaterial);
// Adaugă stelele în scenă
scene.add(stars);

// VERIFICĂM DACĂ AVEM ACCES LA CLASSES NECESARE PENTRU POST-PROCESSING
let composer, renderPass, bloomPass, edgePass;

// Verificăm dacă THREE.EffectComposer este disponibil
if (typeof THREE.EffectComposer !== 'undefined') {
  // POST-PROCESSING EFFECTS
  // Creăm un composer pentru efecte de post-procesare
  composer = new THREE.EffectComposer(renderer);

  // Adăugăm un RenderPass normal
  renderPass = new THREE.RenderPass(scene, camera);
  composer.addPass(renderPass);

  // Adăugăm un UnrealBloomPass pentru efect de strălucire în jurul soarelui
  if (typeof THREE.UnrealBloomPass !== 'undefined') {
    bloomPass = new THREE.UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,    // intensitate
      0.4,    // rază
      0.85    // prag
    );
    composer.addPass(bloomPass);
  } else {
    console.warn("THREE.UnrealBloomPass nu este disponibil. Efectul de bloom nu va fi aplicat.");
  }

  // Shader custom pentru detectarea muchiilor (Edge Detection)
  if (typeof THREE.ShaderPass !== 'undefined') {
    const edgeShader = {
      uniforms: {
        "tDiffuse": { value: null },
        "resolution": { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        "edgeStrength": { value: 3.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec2 resolution;
        uniform float edgeStrength;
        varying vec2 vUv;
        
        void main() {
          vec2 texel = vec2(1.0 / resolution.x, 1.0 / resolution.y);
          
          // Sampling texels în jurul pixelului curent
          vec3 center = texture2D(tDiffuse, vUv).rgb;
          vec3 left = texture2D(tDiffuse, vUv - vec2(texel.x, 0.0)).rgb;
          vec3 right = texture2D(tDiffuse, vUv + vec2(texel.x, 0.0)).rgb;
          vec3 up = texture2D(tDiffuse, vUv - vec2(0.0, texel.y)).rgb;
          vec3 down = texture2D(tDiffuse, vUv + vec2(0.0, texel.y)).rgb;
          
          // Calculăm intensitatea diferenței între pixeli pentru a detecta muchiile
          vec3 dx = abs(left - right);
          vec3 dy = abs(up - down);
          vec3 edge = sqrt(dx * dx + dy * dy);
          
          // Aplicăm efectul de evidențiere a muchiilor
          vec3 result = center + edge * edgeStrength;
          
          gl_FragColor = vec4(result, 1.0);
        }
      `
    };

    // Cream un ShaderPass folosind shader-ul custom de detectare a muchiilor
    edgePass = new THREE.ShaderPass(edgeShader);
    edgePass.enabled = false; // Dezactivat implicit, se va activa printr-un buton
    composer.addPass(edgePass);
  } else {
    console.warn("THREE.ShaderPass nu este disponibil. Efectul de edge detection nu va fi aplicat.");
  }
} else {
  console.warn("THREE.EffectComposer nu este disponibil. Nu se vor aplica efecte de post-procesare.");
}

// MODAL
// Obține elementul modal pentru descrierea planetei
const modal = document.getElementById("planet-description-modal");
// Crează un element h2 pentru titlul modalului
const modalTitle = document.createElement("h2");
// Obține elementul pentru textul descrierii planetei
const modalText = document.getElementById("planet-description-text");
// Crează un div pentru afisarea curiozităților
const modalFacts = document.createElement("div");
// Obține butonul de închidere a modalului
const closeModalButton = document.getElementById("close-modal");
// Obține elementul care va afișa numele planetei
const planetNameBox = document.getElementById("planet-name-box");

// Stilizarea titlului modalului
// Aliniază textul la centru
modalTitle.style.textAlign = "center";
// Adaugă un spațiu sub titlu
modalTitle.style.marginBottom = "15px";
// Setează culoarea textului
modalTitle.style.color = "#333";
// Setează dimensiunea fontului
modalTitle.style.fontSize = "24px";

// Verifică dacă modalul și textul sunt disponibile înainte de a le manipula
if (modal && modalText) {
  // Inserează titlul înaintea textului descriptiv în modal
  modal.insertBefore(modalTitle, modalText);
  // Inserează div-ul cu curiozitățile înainte de butonul de închidere
  modal.insertBefore(modalFacts, closeModalButton);
}

// Adăugăm o secțiune pentru controale în pagină
const controlsContainer = document.createElement("div");
controlsContainer.id = "controls-container";
controlsContainer.style.position = "fixed";
controlsContainer.style.top = "10px";
controlsContainer.style.left = "10px";
controlsContainer.style.zIndex = "100";
controlsContainer.style.backgroundColor = "rgba(0,0,0,0.5)";
controlsContainer.style.padding = "10px";
controlsContainer.style.borderRadius = "5px";
controlsContainer.style.color = "white";
document.body.appendChild(controlsContainer);

// Verificăm dacă avem acces la efectele de post-procesare înainte de a crea butoanele
if (composer) {
  // Buton pentru efectul de edge detection
  if (edgePass) {
    const edgeDetectionButton = document.createElement("button");
    edgeDetectionButton.textContent = "Toggle Edge Detection";
    edgeDetectionButton.style.padding = "5px 10px";
    edgeDetectionButton.style.margin = "5px";
    edgeDetectionButton.style.cursor = "pointer";
    edgeDetectionButton.style.backgroundColor = "#4a90e2";
    edgeDetectionButton.style.border = "none";
    edgeDetectionButton.style.borderRadius = "3px";
    edgeDetectionButton.style.color = "white";
    edgeDetectionButton.addEventListener("click", () => {
      edgePass.enabled = !edgePass.enabled;
    });
    controlsContainer.appendChild(edgeDetectionButton);
  }

  // Buton pentru efectul de bloom
  if (bloomPass) {
    const bloomButton = document.createElement("button");
    bloomButton.textContent = "Toggle Bloom Effect";
    bloomButton.style.padding = "5px 10px";
    bloomButton.style.margin = "5px";
    bloomButton.style.cursor = "pointer";
    bloomButton.style.backgroundColor = "#4a90e2";
    bloomButton.style.border = "none";
    bloomButton.style.borderRadius = "3px";
    bloomButton.style.color = "white";
    bloomButton.addEventListener("click", () => {
      bloomPass.enabled = !bloomPass.enabled;
    });
    controlsContainer.appendChild(bloomButton);
  }
}

// Verificări de siguranță pentru elementele necesare
if (!modal) console.error("Elementul modal nu a fost găsit!");
if (!modalText) console.error("Elementul modalText nu a fost găsit!");
if (!closeModalButton) console.error("Butonul closeModalButton nu a fost găsit!");
if (!planetNameBox) console.error("Elementul planetNameBox nu a fost găsit!");

// Adaugă un eveniment pentru butonul de închidere al modalului
if (closeModalButton) {
  closeModalButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Previi propagarea evenimentului
    console.log('Butonul de închidere a fost apăsat');
    // Ascunde modalul
    modal.style.display = 'none';
  });
}

// Adaugă un eveniment pentru a preveni propagarea click-urilor pe modal
if (modal) {
  modal.addEventListener('click', (event) => {
    event.stopPropagation(); // Previi propagarea click-ului
  });
}

// Funcția pentru deschiderea modalului cu informații despre planetă
function openModal(planet) {
  // Verifică dacă toate elementele necesare sunt disponibile
  if (!modal || !modalText || !modalTitle || !modalFacts) {
    console.error("Elementele necesare pentru modal nu au fost găsite!");
    return;
  }

  // Setează titlul modalului la numele planetei
  modalTitle.textContent = planet.name;

  // Setează textul modalului la descrierea planetei
  modalText.textContent = planet.description;

  // Curăță lista de curiozități și adaugă elementele dacă există
  modalFacts.innerHTML = '';
  if (planet.facts && planet.facts.length) {
    // Crează titlul pentru secțiunea de curiozități
    const factTitle = document.createElement("h3");
    factTitle.textContent = "Curiozități:";
    factTitle.style.marginTop = "20px";
    factTitle.style.marginBottom = "10px";
    factTitle.style.fontSize = "18px";
    factTitle.style.color = "#555";
    modalFacts.appendChild(factTitle);
    
    // Creează lista de curiozități
    const factList = document.createElement("ul");
    factList.style.paddingLeft = "20px";
    
    // Adaugă fiecare fapt în lista de curiozități
    planet.facts.forEach(fact => {
      const factItem = document.createElement("li");
      factItem.textContent = fact;
      factItem.style.marginBottom = "5px";
      factList.appendChild(factItem);
    });
    
    // Adaugă lista de curiozități în modal
    modalFacts.appendChild(factList);
  }

  // Afișează modalul
  modal.style.display = 'block';
  console.log('Modalul a fost deschis pentru:', planet.name);
}

// Variabilă pentru a stoca planeta selectată
let selectedPlanet = null;

// Funcția care se execută la mișcarea mouse-ului
function onMouseMove(event) {
  // Calculăm coordonatele mouse-ului normalizate în intervalul [-1, 1]
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = - (event.clientY / window.innerHeight) * 2 + 1;

  // Creăm un raycaster care va verifica coliziunile între mouse și obiectele din scenă
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(mouseX, mouseY);
  raycaster.setFromCamera(mouse, camera);

  // Creăm o listă de obiecte ce pot fi intersectate
  const intersectObjects = [
    ...planetMeshes.map(({ planetMesh }) => planetMesh),
    sun
  ];

  // Verificăm coliziunile cu toate planetele și Soarele
  const intersects = raycaster.intersectObjects(intersectObjects);

  // Dacă există un obiect cu care mouse-ul a intersectat
  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object;
    
    // Dacă obiectul intersectat este Soarele, setăm informațiile corespunzătoare
    if (intersectedObject === sun) {
      selectedPlanet = {
        name: "Soare",
        description: "Soarele este steaua centrală a sistemului nostru solar.",
        facts: [
          "Soarele constituie aproximativ 99,86% din masa totală a sistemului solar.",
          "Temperatura la suprafața sa este de aproximativ 5.500°C, iar în nucleu ajunge la 15 milioane°C.",
          "Lumina Soarelui ajunge la Pământ în aproximativ 8 minute și 20 de secunde."
        ]
      };
    } else {
      // Altfel, selectăm planeta pe care am dat click
      selectedPlanet = planetMeshes.find(({ planetMesh }) => planetMesh === intersectedObject).planet;
    }

    // Dacă există un element pentru numele planetei, îl actualizăm
    if (planetNameBox) {
      planetNameBox.textContent = selectedPlanet.name;
      planetNameBox.style.display = 'block';
      planetNameBox.style.left = `${event.clientX + 10}px`;
      planetNameBox.style.top = `${event.clientY + 10}px`;
    }
  } else {
    // Dacă nu există niciun obiect cu care să intersecteze, ascundem numele planetei
    if (planetNameBox) {
      planetNameBox.style.display = 'none';
    }
    selectedPlanet = null; // Resetăm planeta selectată
  }
}

// Funcția care se execută la click pe ecran
function onMouseClick(event) {
  // Dacă modalul este deja deschis, nu mai facem nimic
  if (modal && modal.style.display === 'block') {
    return;
  }

  // Dacă există o planetă selectată, deschidem modalul cu informațiile acesteia
  if (selectedPlanet) {
    openModal(selectedPlanet);
  }
}

// Event listener pentru a închide modalul dacă se face click în afara lui
document.addEventListener('click', (event) => {
  if (modal && modal.style.display === 'block') {
    // Dacă nu s-a dat click pe modal sau pe butonul de închidere, închidem modalul
    if (!modal.contains(event.target) && event.target !== closeModalButton) {
      modal.style.display = 'none';
      console.log('Modalul a fost închis prin click în afara sa');
    }
  }
});

// Adăugăm evenimentele de mișcare și click pentru interacțiunea cu scena
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('click', onMouseClick);

// Funcția de animație a planetelor și randarea scenei
function animate(time) {
  // Re-apelăm funcția animate pentru a crea un loop
  requestAnimationFrame(animate);

  // Rotim soarele
  sun.rotation.y += 0.002;

  // Animațiile planetelor: mișcarea pe orbită și rotația proprie
  planetMeshes.forEach(({ planetMesh, planetGroup, planet }) => {
    // Folosim time doar dacă există (poate fi undefined la prima rulare)
    const currentTime = time || 0;
    const speed = planet.speed * currentTime;
    planetGroup.position.x = planet.distance * Math.cos(speed);
    planetGroup.position.z = planet.distance * Math.sin(speed);
    planetMesh.rotation.y += 0.01;
  });

  // Folosim composer-ul pentru randare dacă este disponibil, altfel folosim renderer-ul standard
  if (composer) {
    composer.render();
  } else {
    renderer.render(scene, camera);
  }
}

// Adăugăm un event listener pentru redimensionarea ferestrei, pentru a ajusta camera și renderer-ul
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  
  renderer.setSize(width, height);
  
  // Actualizăm composer-ul dacă există
  if (composer) {
    composer.setSize(width, height);
    
    // Actualizăm uniform-ul resolution din shader-ul nostru dacă există
    if (edgePass && edgePass.uniforms && edgePass.uniforms.resolution) {
      edgePass.uniforms.resolution.value.set(width, height);
    }
  }
});

// Pornim animația
animate();

window.addEventListener('DOMContentLoaded', () => {
  const welcomeModal = document.getElementById('welcome-modal');
  const closeWelcomeBtn = document.getElementById('close-welcome');

  closeWelcomeBtn.addEventListener('click', () => {
    welcomeModal.style.display = 'none';
  });
});
