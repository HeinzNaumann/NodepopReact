import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../common/button";
import Layout from "../../layout/Layout";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';


//Archivos que pasamos
import { getUltimosAnuncios } from "../service";
import ArrayAnuncio from "./ArrayAnuncios";

import "./PaginaAnuncios.css";

import styles from "./AnunciosPagina.module.css";


const MySlider = Slider.createSliderWithTooltip(Slider.Range);


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

  const saleFilter = {
  all: { value: 'all', label: 'All' },
  sell: { value: 'sell', label: 'Sell' },
  buy: { value: 'buy', label: 'Buy' },
};

  //Elementos del  filtro
  const [elementosFiltro, setValue] = useState({
    name: "",
    price: "",
    sale: saleFilter.all.value,
    tags: []

  });

  const handleChange = event => {
    setValue(() => ({
      ...elementosFiltro,
      [event.target.name]: event.target.value,
    }));
  };

    const checkModifier = (e) => {

    let multiselect = [...elementosFiltro.tags];
    const checkeName = e.target.value;
    
     if (multiselect.indexOf(checkeName) < 0) {
      multiselect.push(checkeName);
    } else {
      multiselect = multiselect.filter((e) => e !== checkeName);
    }
    setValue({
      ...elementosFiltro,
      tags : multiselect,
    })
    }
  
  const checkPriceValue = (e) => {
       
    console.log(e)

    let multiselectPrice = e;

    setValue({
      ...elementosFiltro,
      price : multiselectPrice,
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
        <label>Selecciona un rango de precio</label>

        <MySlider

          defaultValue={[0, 10000]}
          name="price"
          min={0}
          max={10000}
          onChange={checkPriceValue}
          railStyle={{
            height: 2
          }}/>

       
        <label htmlFor="tags"> Escoge un precio </label>
         <select
          name='sale'
          value={elementosFiltro.sale}
          onChange={handleChange}
        >
          <option value={saleFilter.all.value}> Todos </option>
          <option value={saleFilter.buy.value}> Se compra </option>
          <option value={saleFilter.sell.value}>Se vende</option>
        </select>
        <label htmlFor="tags"> Elige una categoria
        </label>
        <label >lyfestyle</label>
        <input type="checkbox" name="tags"  onChange={checkModifier} value="lyfestyle" />
        <label >Motor</label>
        <input type="checkbox" name="tags" onChange={checkModifier} value="motor" />
        <label >Mobile</label>
        <input type="checkbox" onChange={checkModifier} value="mobile" />
        <label >Work</label>
        <input type="checkbox"  onChange={checkModifier} value="work"/>
       
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
