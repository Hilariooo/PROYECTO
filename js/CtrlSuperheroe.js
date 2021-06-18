import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  eliminaStorage,
  urlStorage
} from "../lib/storage.js";
import {
  cod,
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraTenis
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";
import {
  guardaSuperheroes
} from "./guardarSuperheroes.js";

const params =
  new URL(location.href).
    searchParams;
const id = params.get("id");
const daoSuperheroes = getFirestore().
  collection("Superheroes");
/** @type {HTMLFormElement} */
const forma = document["forma"];
const img = document.
  querySelector("img");
/** @type {HTMLUListElement} */
getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Cliente"] || ["Administrador"])) {
    busca();
  }
}

async function busca() {
  try {
    const doc = await daoSuperheroes.
      doc(id).
      get();
    if (doc.exists) {
      const data = doc.data();
      const nombre = cod(data.nombre);
      forma.nombre.value =
        data.nombre || "";
      forma.superpoder.value =
        data.superpoder || "";
      img.src =
        await urlStorage(nombre);
        forma.addEventListener(
        "submit", guarda);
      forma.eliminar.
        addEventListener(
          "click", elimina);
    }
  } catch (e) {
    muestraError(e);
    muestraTenis();
  }
}


/** 
 * @param {Event} evt */
 async function guarda(evt) {
  evt.preventDefault();
  const formData =
    new FormData(forma);
  const id = getString(
    formData, "nombre").trim();

  await guardaSuperheroes(evt,
   formData, id);
}


async function elimina() {
  try {
    const formData =
    new FormData(forma);
  const nombre = getString(
    formData, "nombre").trim();
    if (confirm("Confirmar la " +
      "eliminación")) {
      await daoSuperheroes.
        doc(id).
        delete();
      await eliminaStorage(modelo);
      muestraTenis();
    }
  } catch (e) {
    muestraError(e);
  }
}
