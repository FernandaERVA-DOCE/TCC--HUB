// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// 1) Seu config (o seu mesmo)
const firebaseConfig = {
  apiKey: "AIzaSyAz9dC1RvvFrJhmpai19_elwQvXD13blQ0",
  authDomain: "tcc---hub.firebaseapp.com",
  projectId: "tcc---hub",
  storageBucket: "tcc---hub.firebasestorage.app",
  messagingSenderId: "947203923355",
  appId: "1:947203923355:web:cff1e0300bd673e8bed53e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 2) Ajuste estes IDs para bater com seu HTML
const btnLogin = document.getElementById("btnLogin");   // ex: botão "Entrar com Google"
const btnLogout = document.getElementById("btnLogout"); // ex: botão "Sair"
const statusEl = document.getElementById("loginStatus"); // ex: texto "logado como..."

const WORKSPACE_ID = "tccHub";

// 3) Lista de brigadas (dropdown)
const BRIGADAS = ["Confeitaria", "Bebidas", "Quente", "Fria", "Serviço", "Pesquisa"];

async function ensureMemberProfile(user) {
  // UID vira o ID do documento
  const ref = doc(db, "workspaces", WORKSPACE_ID, "members", user.uid);

  // Cria/atualiza sem apagar o que já existe (merge: true)
  await setDoc(ref, {
    uid: user.uid,
    name: user.displayName || "",
    email: user.email || "",
    photoURL: user.photoURL || "",
    brigada: "",        // depois o usuário escolhe no site
    cargo: "",          // opcional
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }, { merge: true });
}

btnLogin?.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  await ensureMemberProfile(result.user);
});

btnLogout?.addEventListener("click", async () => {
  await signOut(auth);
});

onAuthStateChanged(auth, async (user) => {
  if (!statusEl) return;

  if (user) {
    statusEl.textContent = `Logado como: ${user.email}`;
    await ensureMemberProfile(user); // garante que existe doc mesmo se recarregar
  } else {
    statusEl.textContent = "Não logado";
  }
});
