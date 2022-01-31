import Layout from "../../layout/Layout";
import Button from "../../common/button";
import { useState } from "react";
import { createAnuncio } from "../service";

import "./PaginaNuevoAnuncio.css"

function PaginaNuevoAnuncio({ history }) {
  const [value, setValue] = useState({
    name: "",
    sale: "true",
    photo: "",
    tags: [],
    price: "",
  });


  const checkModifier = (e) => {
  
    let multiselect = [...value.tags];
    console.log(multiselect)
    const checkeName = e.target.value;
    
     if (multiselect.indexOf(checkeName) < 0) {
      multiselect.push(checkeName);
    } else {
      multiselect = multiselect.filter((e) => e !== checkeName);
    }
    setValue({
      ...value,
      tags : multiselect,
    })
  }
  
  const handleChange = e => {
    console.log(e.target.value)
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const data = new FormData(event.target);
      console.log(data);
      await createAnuncio(data);
      history.push("/");
    } catch (error) {
  console.error('outer', error);
   }
  };

  return (
    <Layout title='Crea tu nuevo anuncio'>
      <form onSubmit={handleSubmit}>
        <label>Introduce el nombre del producto</label>
        <input
          type='text'
          name='name'
          value={value.name}
          onChange={handleChange}
        />
        <label>Introduce si esta en venta o se compra </label>
        <select
          name='sale'
          value={value.sale}
          onChange={handleChange}
        >
          <option value="true">Se compra </option>
          <option value="false">Se vende</option>
        </select>
        <label htmlFor="tags"> Choose tags </label>
        <label >lyfestyle</label>
        <input type="checkbox" name="tags"  onChange={checkModifier} value="lyfestyle" />
        <label >Motor</label>
        <input type="checkbox" name="tags" onChange={checkModifier} value="motor" />
        <label >Mobile</label>
        <input type="checkbox" onChange={checkModifier} value="mobile" />
        <label >Work</label>
        <input type="checkbox"  onChange={checkModifier} value="work"/>

        <label>Introduce el precio </label>
        <input
          type='number'
          name='price'
          value={value.price}
          onChange={handleChange}
        />
        
        <input
          name='photo'
          type='file'
          value={value.photo }
          onChange={handleChange}
        />
        <Button
          disabled={!value.name || !value.price}
          type='submit'
          className='newTweetPage-submit'
          variant='primary'
        >
          Crear
        </Button>
      </form>
    </Layout>
  );
}

export default PaginaNuevoAnuncio;
