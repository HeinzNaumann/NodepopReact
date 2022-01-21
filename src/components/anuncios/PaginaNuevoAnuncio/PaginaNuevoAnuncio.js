import Layout from "../../layout/Layout";
import Button from "../../common/button";
import { useState } from "react";
import { createAnuncio } from "../service";

function PaginaNuevoAnuncio({ history }) {
  const [value, setValue] = useState({
    name: "",
    sale: "",
    photo: "",
    tags: [],
    price: "",
  });

  const handleChange = e => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const data = new FormData(event.target);
      await createAnuncio(data);
      history.push("/");
    } catch {}
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
          type='checkbox'
          name='sale'
          value={value.sale}
          onChange={handleChange}
        >
          <option value='true'> Se compra </option>
          <option value='false'>Se vende</option>
        </select>
        <label>Introduce la categoria </label>
        <select name='tags' onChange={handleChange}>
          <option value='lifestyle'>lifestyle</option>
          <option value='mobile'>mobile</option>
          <option value='motor'>motor</option>
          <option value='work'>work</option>
        </select>

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
          value={value.photo}
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
