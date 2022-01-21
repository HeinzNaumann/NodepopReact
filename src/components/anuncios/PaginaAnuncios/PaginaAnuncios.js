import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../common/button";
import Layout from "../../layout/Layout";

//Archivos que pasamos
import { getUltimosAnuncios } from "../service";
import ArrayAnuncio from "./ArrayAnuncios";

import "./PaginaAnuncios.css";

import styles from "./AnunciosPagina.module.css";

export const ListaVacia = () => (
  <div style={{ textAlign: "center" }}>
    <p>Pon el primer anuncio</p>
    <Button as={Link} to='/adverts/new' variant='primary'>
      anuncio
    </Button>
  </div>
);

function PaginaAnuncios(...props) {
  const [anuncios, setAnuncios] = useState([]);

  const [elementosFiltro, setValue] = useState({
    name: "",
    apellido: "",
  });

  useEffect(() => {
    getUltimosAnuncios().then(setAnuncios);
  }, []);

  const handleChange = event => {
    setValue(() => ({
      ...elementosFiltro,
      [event.target.name]: event.target.value,
      [event.target.apellido]: event.target.value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <Layout title='Listado de anuncios NodePop' {...props}>
      <h1>Filtros</h1>
      <form onSubmit={handleSubmit}>
        <label>Busca un producto</label>
        <input type='text' name='name' onChange={handleChange} />
        <label>Busca un producto</label>
        <input type='text' name='apellido' onChange={handleChange} />
        {/* <input type='checkbox' />
        <label for='vehicle2'>Se compra</label>
        <input type='checkbox' />
        <label for='vehicle2'> Precio desde</label>
        <input type='number' />
        <label for='vehicle2'>hasta</label>
        <input type='number' />
        <label for='cars'>Choose a car:</label>
        <select size='4' multiple>
          <option value='lifestyle'>lifestyle</option>
          <option value='mobile'>mobile</option>
          <option value='motor'>motor</option>
          <option value='work'>work</option>
        </select>{" "}
        } */}
        <button type='submit'>Filter</button>
      </form>
      <ArrayAnuncio
        anuncios={anuncios}
        valueName={elementosFiltro.name}
        valueApellido={elementosFiltro.apellido}
      ></ArrayAnuncio>
      <div className={styles.paginaAnuncios}></div>
    </Layout>
  );
}

export default PaginaAnuncios;
