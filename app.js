// ===== CONFIG FIREBASE =====
const firebaseConfig = {
  apiKey: "AIzaSyAz9dC1RvvFrJhmpai19_elwQvXD13blQ0",
  authDomain: "tcc---hub.firebaseapp.com",
  projectId: "tcc---hub",
  storageBucket: "tcc---hub.firebasestorage.app",
  messagingSenderId: "947203923355",
  appId: "1:947203923355:web:cff1e0300bd673e8bed53e"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

// Documento único do grupo
const DOC_PATH = "workspaces/tccHub";

let data = null;
let currentUser = null;

const BIOMES = [
  "Amazônia",
  "Cerrado",
  "Caatinga",
  "Mata Atlântica",
  "Pampa",
  "Pantanal"
];

const defaultData = {
  biomes: Object.fromEntries(
    BIOMES.map(b => [b, {
      territorio: { area:"", estados:"", clima:"", estacoes:"", hidrico:"" },
      terroir: { frutas:[], vegetais:[], proteinas:[], tecnicas:[], pratos:[] },
      cultura: { musica:"", manifestacoes:"" },
      imaginario: { encantados:[], notes:"" }
    }])
  ),
  tasks: [],
  decisions: []
};

// ================= LOGIN =================

document.getElementById("btnLogin").addEventListener("click", async () => {
  await auth.signInWithPopup(provider);
});

document.getElementById("btnLogout").addEventListener("click", async () => {
  await auth.signOut();
});

auth.onAuthStateChanged(async user => {
  currentUser = user;

  if (user) {
    document.getElementById("userInfo").innerText =
      "Logado como: " + user.email;
    document.getElementById("status").innerText = "Status: online";

    await loadFromCloud();
    initUI();
  } else {
    document.getElementById("userInfo").innerText =
      "Faça login para editar.";
    document.getElementById("status").innerText = "Status: offline";
  }
});

// ================= BANCO =================

async function loadFromCloud() {
  const snap = await db.doc(DOC_PATH).get();

  if (!snap.exists) {
    data = structuredClone(defaultData);
    await saveToCloud();
  } else {
    data = snap.data();
  }
}

async function saveToCloud() {
  if (!currentUser) return;

  data._updatedAt = new Date().toISOString();
  data._updatedBy = currentUser.email;

  await db.doc(DOC_PATH).set(data, { merge: true });
}

// ================= UI =================

function initUI() {
  const biomeSelect = document.getElementById("biomeSelect");
  biomeSelect.innerHTML = "";

  BIOMES.forEach(b => {
    biomeSelect.appendChild(new Option(b, b));
  });

  biomeSelect.addEventListener("change", () => {
    fillBiome(biomeSelect.value);
  });

  fillBiome(BIOMES[0]);

  document.getElementById("saveBiome").addEventListener("click", async () => {
    const b = biomeSelect.value;
    const obj = data.biomes[b];

    obj.territorio.area = val("t_area");
    obj.territorio.estados = val("t_estados");
    obj.territorio.clima = val("t_clima");
    obj.territorio.estacoes = val("t_estacoes");
    obj.territorio.hidrico = val("t_hidrico");

    obj.terroir.frutas = csv(val("g_frutas"));
    obj.terroir.vegetais = csv(val("g_vegetais"));
    obj.terroir.proteinas = csv(val("g_proteinas"));
    obj.terroir.tecnicas = csv(val("g_tecnicas"));
    obj.terroir.pratos = csv(val("g_pratos"));

    obj.cultura.musica = val("c_musica");
    obj.cultura.manifestacoes = val("c_manifestacoes");

    obj.imaginario.encantados = csv(val("encantados"));
    obj.imaginario.notes = val("notes");

    await saveToCloud();
    alert("Salvo online ✅");
  });

  renderKanban();
  renderDecisions();
}

// ================= BIOMA =================

function fillBiome(b) {
  const obj = data.biomes[b];

  set("t_area", obj.territorio.area);
  set("t_estados", obj.territorio.estados);
  set("t_clima", obj.territorio.clima);
  set("t_estacoes", obj.territorio.estacoes);
  set("t_hidrico", obj.territorio.hidrico);

  set("g_frutas", obj.terroir.frutas.join(", "));
  set("g_vegetais", obj.terroir.vegetais.join(", "));
  set("g_proteinas", obj.terroir.proteinas.join(", "));
  set("g_tecnicas", obj.terroir.tecnicas.join(", "));
  set("g_pratos", obj.terroir.pratos.join(", "));

  set("c_musica", obj.cultura.musica);
  set("c_manifestacoes", obj.cultura.manifestacoes);

  set("encantados", obj.imaginario.encantados.join(", "));
  set("notes", obj.imaginario.notes);
}

// ================= KANBAN =================

document.getElementById("addTask").addEventListener("click", async () => {
  data.tasks.push({
    id: Date.now(),
    title: val("task_title"),
    owner: val("task_owner"),
    col: "todo"
  });

  await saveToCloud();
  renderKanban();
});

function renderKanban() {
  ["todo","doing","review","done"].forEach(c => {
    const list = document.getElementById(c);
    list.innerHTML = "";

    data.tasks
      .filter(t => t.col === c)
      .forEach(t => {
        const div = document.createElement("div");
        div.className = "task";
        div.innerHTML = "<b>" + t.title + "</b><div class='meta'>👤 " + t.owner + "</div>";
        list.appendChild(div);
      });
  });
}

// ================= DECISÕES =================

document.getElementById("addDecision").addEventListener("click", async () => {
  data.decisions.unshift({
    id: Date.now(),
    title: val("dec_title"),
    detail: val("dec_detail"),
    date: new Date().toLocaleDateString()
  });

  await saveToCloud();
  renderDecisions();
});

function renderDecisions() {
  const wrap = document.getElementById("decList");
  wrap.innerHTML = "";

  data.decisions.forEach(d => {
    const div = document.createElement("div");
    div.className = "dec";
    div.innerHTML =
      "<div class='decTitle'>" + d.title + "</div>" +
      "<div class='decDetail'>" + d.detail + "</div>";
    wrap.appendChild(div);
  });
}

// ================= HELPERS =================

function val(id){ return document.getElementById(id).value.trim(); }
function set(id,v){ document.getElementById(id).value = v || ""; }
function csv(s){ return s.split(",").map(x=>x.trim()).filter(Boolean); }