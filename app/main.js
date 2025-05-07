// SCENĂ
const scene = new THREE.Scene();

// CAMERĂ
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 100;

// RENDERER
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("scene") });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// SOARE
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 0, 0);
scene.add(sun);

// PLANETE
const planets = [
  {
    name: "Mercur",
    radius: 2,
    distance: 15,
    color: 0xaaaaaa,
    speed: 0.0003,
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
    description: "Neptun este o planetă albastră, cunoscută pentru vânturile sale puternice.",
    facts: [
      "Vânturile pe Neptun pot atinge 2.100 km/h, cele mai rapide din sistemul solar.",
      "A fost descoperită prin calcule matematice înainte de a fi observată.",
      "O zi pe Neptun durează aproximativ 16 ore pământești."
    ]
  }
];

// Creare planete
const planetMeshes = planets.map(planet => {
  const geometry = new THREE.SphereGeometry(planet.radius, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: planet.color });
  const planetMesh = new THREE.Mesh(geometry, material);
  planetMesh.position.set(planet.distance, 0, 0);
  scene.add(planetMesh);
  return { planetMesh, planet };
});

// LUMINI
const sunLight = new THREE.PointLight(0xffffff, 1, 500);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 50, 50);
scene.add(directionalLight);

// STELE
const starsGeometry = new THREE.BufferGeometry();
const starCount = 200;
const positions = [];
for (let i = 0; i < starCount; i++) {
  positions.push(Math.random() * 200 - 100);
  positions.push(Math.random() * 200 - 100);
  positions.push(Math.random() * 200 - 100);
}
starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
const starsMaterial = new THREE.PointsMaterial({ color: 0x888888, size: 0.3 });
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// MODAL
const modal = document.getElementById("planet-description-modal");
const modalTitle = document.createElement("h2");
const modalText = document.getElementById("planet-description-text");
const modalFacts = document.createElement("div");
const closeModalButton = document.getElementById("close-modal");
const planetNameBox = document.getElementById("planet-name-box");

// Stilizarea titlului
modalTitle.style.textAlign = "center";
modalTitle.style.marginBottom = "15px";
modalTitle.style.color = "#333";
modalTitle.style.fontSize = "24px";


if (modal && modalText) {
  modal.insertBefore(modalTitle, modalText);
  modal.insertBefore(modalFacts, closeModalButton);
}


if (!modal) console.error("Elementul modal nu a fost găsit!");
if (!modalText) console.error("Elementul modalText nu a fost găsit!");
if (!closeModalButton) console.error("Butonul closeModalButton nu a fost găsit!");
if (!planetNameBox) console.error("Elementul planetNameBox nu a fost găsit!");


if (closeModalButton) {
  closeModalButton.addEventListener('click', (event) => {
    event.stopPropagation(); 
    console.log('Butonul de închidere a fost apăsat');
    modal.style.display = 'none';
  });
}


if (modal) {
  modal.addEventListener('click', (event) => {
    event.stopPropagation(); 
  });
}


function openModal(planet) {
  if (!modal || !modalText || !modalTitle || !modalFacts) {
    console.error("Elementele necesare pentru modal nu au fost găsite!");
    return;
  }
  

  modalTitle.textContent = planet.name;

  modalText.textContent = planet.description;
  

  modalFacts.innerHTML = '';
  if (planet.facts && planet.facts.length) {
    const factTitle = document.createElement("h3");
    factTitle.textContent = "Curiozități:";
    factTitle.style.marginTop = "20px";
    factTitle.style.marginBottom = "10px";
    factTitle.style.fontSize = "18px";
    factTitle.style.color = "#555";
    modalFacts.appendChild(factTitle);
    
    const factList = document.createElement("ul");
    factList.style.paddingLeft = "20px";
    
    planet.facts.forEach(fact => {
      const factItem = document.createElement("li");
      factItem.textContent = fact;
      factItem.style.marginBottom = "5px";
      factList.appendChild(factItem);
    });
    
    modalFacts.appendChild(factList);
  }
  

  modal.style.display = 'block';
  console.log('Modalul a fost deschis pentru:', planet.name);
}


let selectedPlanet = null;

function onMouseMove(event) {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = - (event.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(mouseX, mouseY);
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects([
    ...planetMeshes.map(({ planetMesh }) => planetMesh),
    sun
  ]);

  if (intersects.length > 0) {
    const intersectedObject = intersects[0].object;
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
      selectedPlanet = planetMeshes.find(({ planetMesh }) => planetMesh === intersectedObject).planet;
    }
    
    if (planetNameBox) {
      planetNameBox.textContent = selectedPlanet.name;
      planetNameBox.style.display = 'block';
      planetNameBox.style.left = `${event.clientX + 10}px`;
      planetNameBox.style.top = `${event.clientY + 10}px`;
    }
  } else {
    if (planetNameBox) {
      planetNameBox.style.display = 'none';
    }
    selectedPlanet = null;
  }
}

function onMouseClick(event) {

  if (modal && modal.style.display === 'block') {

    return;
  }
  

  if (selectedPlanet) {
    openModal(selectedPlanet);
  }
}


document.addEventListener('click', (event) => {
  if (modal && modal.style.display === 'block') {

    if (!modal.contains(event.target) && event.target !== closeModalButton) {
      modal.style.display = 'none';
      console.log('Modalul a fost închis prin click în afara sa');
    }
  }
});

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('click', onMouseClick);

// ANIMAȚIE
function animate(time) {
  requestAnimationFrame(animate);

  planetMeshes.forEach(({ planetMesh, planet }) => {
    const speed = planet.speed * time;
    planetMesh.position.x = planet.distance * Math.cos(speed);
    planetMesh.position.z = planet.distance * Math.sin(speed);
    planetMesh.rotation.y += 0.01;
  });

  renderer.render(scene, camera);
}


window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


animate();