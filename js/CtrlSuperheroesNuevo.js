import {
  getAuth
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";
import {
  guardaSuperheroes
} from "./guardarSuperheroes.js";


/** @type {HTMLFormElement} */
const forma = document["forma"];
getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    forma.addEventListener(
      "submit", guarda);
  }
}

/** 
 * @param {Event} evt */
async function guarda(evt) {
  const formData =
    new FormData(forma);
  const id = getString(
    formData, "nombre").trim();

  await guardaSuperheroes(evt,
   formData, id);
}
