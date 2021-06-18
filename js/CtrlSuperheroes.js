import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  urlStorage
} from "../lib/storage.js";
import {
  cod,
  muestraError
} from "../lib/util.js";
import {
  tieneRol
} from "./seguridad.js";

/** @type {HTMLUListElement} */
const lista = document.
  querySelector("#lista");
const firestore = getFirestore();
const daoSuperheroes = firestore.
  collection("Superheroes");

getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
    async function protege(usuario) {
      if (tieneRol(usuario,
        ["Cliente"] || ["Administrador"])) {
        consulta();
        }
    }

function consulta() {
  daoTenis.
    orderBy("nombre")
    .onSnapshot(
      htmlLista, errConsulta);
}

/**
 * @param {import(
    "../lib/tiposFire.js").
    QuerySnapshot} snap */
async function htmlLista(snap) {
  let html = "";
  if (snap.size > 0) {
    /** @type {
          Promise<string>[]} */
    let usuarios = [];
    snap.forEach(doc => usuarios.
      push(htmlFila(doc)));
    const htmlFilas =
      await Promise.all(usuarios);
    /* Junta el todos los
     * elementos del arreglo en
     * una cadena. */
    html += htmlFilas.join("");
  } else {
    html += /* html */
      `<li class="vacio">
        -- No hay superhéroes
        registrados. --
      </li>`;
  }
  lista.innerHTML = html;
}

/**
 * @param {import(
    "../lib/tiposFire.js").
    DocumentSnapshot} doc */
async function htmlFila(doc) {
  /**
   * @type {import("./tipos.js").
                      Tenis} */
  const data = doc.data();
  const nombre = cod(data.nombre);
  const superpoder = cod(data.superpoder);
  const img = cod(
    await urlStorage(nombre));
  const parámetros =
  new URLSearchParams();
  parámetros.append("id", doc.id);
  return (/* html */
    `<li>
      <a class="fila conImagen"
          href=
    "superheroe.html?${parámetros}">
        <span class="marco">
          <img src="${img}"
            alt="Falta la imagen del superhéroe">
        </span>
        <span class="texto">
          <strong
              class="primario">
            ${nombre}
          </strong>
          <span
          class="secundario">
        ${superpoder}
      </span>
        </span>
      </a>
    </li>`);
}


/** @param {Error} e */
function errConsulta(e) {
  muestraError(e);
  consulta();
}
