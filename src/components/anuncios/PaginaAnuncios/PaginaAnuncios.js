import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../common/button";
import Layout from "../../layout/Layout";


//Archivos que pasamos
import { getUltimosAnuncios } from "../service";
import ArrayAnuncio from "./ArrayAnuncios";

import "./PaginaAnuncios.css";

import styles from "./AnunciosPagina.module.css";
import SelectTags from "../SelectTags/selectTags";

export const ListaVacia = () => (
  <div style={{ textAlign: "center" }}>
    <p>Pon el primer anuncio</p>
    <Button as={Link} to='/adverts/new' variant='primary'>
      anuncio
    </Button>
  </div>
);

function PaginaAnuncios(...props) {

  //Listado de  todos los anuncios
  const [anuncios, setAnuncios] = useState([]);
  
  //Elementos del  filtro
  const [elementosFiltro, setValue] = useState({
    name: "",
    price: 0,
    sale: "all",
    tags: []

  });

   const handleChange = event => {
    setValue(() => ({
      ...elementosFiltro,
      [event.target.name]: event.target.value,
      [event.target.price]: event.target.value,
      [event.target.sale]: event.target.value
    }));
  };

  const checkModifier = (e) => {
    let multiselect = [...elementosFiltro.tags];
    const changedInput = e.target.name;
    const inputValue = e.target.value;
     if (multiselect.indexOf(inputValue) < 0) {
      multiselect.push(inputValue);
    } else {
      multiselect = multiselect.filter((e) => e !== inputValue);
    }
    setValue({
      ...elementosFiltro,
      [changedInput]: multiselect,
    })
  }


  useEffect(() => {
    getUltimosAnuncios().then(setAnuncios);
  }, []);

 

  const handleSubmit = event => {
    event.preventDefault();

  };

  return (
    <Layout title='Listado de anuncios NodePop' {...props}>
      <h1>Filtros</h1>
      <form onSubmit={handleSubmit}>
        <label>Busca un producto</label>
        <input type='text' name='name' onChange={handleChange} />
        <label>Price</label>
        <input type='number' name='price' onChange={handleChange} />
         <div className="select select-multiple">
          <SelectTags {...props}/>
          <span className="focus"></span>
        </div>
         <select
          type='checkbox'
          name='sale'
          value={elementosFiltro.sale}
          onChange={handleChange}
        >
          <option value='all'> Todos </option>
          <option value='buy'> Se compra </option>
          <option value='sell'>Se vende</option>
        </select>
        <button type='submit'>Filter</button>
      </form>
      <ArrayAnuncio
        
        anuncios={anuncios}
        valueName={elementosFiltro.name}
        valuePrecio={elementosFiltro.price}
        valueTags={elementosFiltro.tags}
        valueSale={elementosFiltro.sale}
      ></ArrayAnuncio>
      <div className={styles.paginaAnuncios}></div>
    </Layout>
  );
}

export default PaginaAnuncios;
