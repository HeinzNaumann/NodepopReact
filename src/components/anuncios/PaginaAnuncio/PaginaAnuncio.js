import { useEffect, useState } from "react";
import { getUltimoAnuncio, deleteAnuncio } from "../service";

import ConfirmButton from "../../common/ConfirmButton";

import Layout from "../../layout/Layout";

import "./PaginaAnuncios.css";

function PaginaAnuncio({ match, history }) {
  console.log(match);

  const [anuncio, setAnuncios] = useState([]);

  const borrarAnuncio = function () {
    deleteAnuncio(match.params.Id).then(history.push("/"));
  };

  useEffect(() => {
    getUltimoAnuncio(match.params.Id).then(setAnuncios);
  }, []);

  return (
    <Layout title='Detalle Anuncio'>
      <ul className='contenedor-anuncios'>
        <li className='listado-anuncios'>
          <div className='bloque-anuncio'>
            <img
              alt='imagenes-articulos'
              className='imagenes-anuncios'
              src={`${process.env.REACT_APP_API_BASE_URL}${anuncio.photo}`}
            />
            <h2>{anuncio.name}</h2>
            <p>
              <strong>Precio:</strong> {anuncio.price}{" "}
            </p>
            <p>
              <strong>Tipo:</strong> {anuncio.tags}{" "}
            </p>
            <p>
              <strong> Estado: </strong>
              {anuncio.sale ? `En venta` : `Se compra`}
            </p>
            {
              <ConfirmButton
                confirmation='Are you sure?'
                className='myButton'
                onConfirm={borrarAnuncio}
              >
                Delete
              </ConfirmButton>
            }
          </div>
        </li>
      </ul>
    </Layout>
  );
}

export default PaginaAnuncio;
