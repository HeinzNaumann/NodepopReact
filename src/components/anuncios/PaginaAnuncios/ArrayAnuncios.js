import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { ListaVacia } from "./PaginaAnuncios";

import styles from "./AnunciosPagina.module.css";

const ArrayAnuncio = ({ anuncios, valueName, valuePrecio, valueTags, valueSale }) => {
   

  let filtrados = anuncios.filter((anuncio) => {

    if (valueSale === "all" && valueSale.sale === true && valueSale === true) {
      return anuncio.sale;
    }

    if (anuncio.sale === true) {
      anuncio.sale = "sell";
      console.log(anuncio.sale);
    }

    if (anuncio.sale === valueSale) {
      return anuncio.sale;
    }

       if (anuncio.sale === false) {
      anuncio.sale = "buy";
      console.log(anuncio.sale);
    }

    if (anuncio.sale === valueSale) {
      return anuncio.sale;
    }

    //Filtro Tags
      let result = true;
      for (let i=0; i < valueTags.length; i++) {
        result = result && anuncio.tags.includes(valueTags[i]);
        if (result) {
          return anuncio.tags;
        }
      }
    
    
    //Filtro Nombre
    if (anuncio.name === valueName) {
      return anuncio.name;
    //Filtro precio
    } else if (anuncio.price >= valuePrecio[0] && anuncio.price <= valuePrecio[1]) {
      console.log(valuePrecio[0])
      console.log(anuncio.price)
      
      return anuncio.price;
    } 


   
  });



   if (filtrados.length === 0) {
    filtrados = anuncios.filter( () => {
      return "No  hay anuncios";
    });
   }
  
  console.log(filtrados)


  return (
    <Fragment>
      <div className={styles.paginaAnuncios}>
        {anuncios.length ? (
          <ul className='contenedor-anuncios'>
            {filtrados.map(anuncio => (
              <li className='listado-anuncios' key={anuncio.id}>
                <Link to={`/adverts/${anuncio.id}`}>
                  <div className='bloque-anuncio'>
                    <img
                      alt='imagenes-articulos'
                      className='imagenes-anuncios'
                      src={anuncio.photo  === null ? "/logo192.png" : `${process.env.REACT_APP_API_BASE_URL}${anuncio.photo}` }
                    />
                    <h2>{anuncio.name}</h2>
                    <p>
                      {" "}
                      <strong>Precio:</strong> {anuncio.price}{" "}
                    </p>
                    <p>
                      <strong>Tipo:</strong> {anuncio.tags}{" "}
                    </p>
                    <p>
                      <strong> Estado: </strong>
                      {anuncio.sale ? `Se compra` : `En venta`}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ListaVacia />
        )}
      </div>
    </Fragment>
  );
};

export default ArrayAnuncio;
