import {
  getFirestore
} from "../lib/fabrica.js";
import {
  subeStorage
} from "../lib/storage.js";
import {
  muestraError
} from "../lib/util.js";
import {
  muestraSuperheroes
} from "./navegacion.js";


const firestore = getFirestore();
const daoSuperheroes = firestore.
  collection("Superheroes");

/**
 * @param {Event} evt
 * @param {FormData} formData
 * @param {string} id  */
export async function
guardaSuperheroes(evt, formData,
    id) {
  try {
    evt.preventDefault();
  const nombre = 
    formData.get("nombre");
  const superpoder = 
    formData.get("superpoder");
  
    const modelo = {
    nombre,superpoder
    };
    await daoSuperheroes.
    doc(id).
    set(modelo);
    
  const avatar =
    formData.get("avatar");
    await subeStorage(id, avatar);
    muestraSuperheroes();
  } catch (e) {
    muestraError(e);
  }
}
  
