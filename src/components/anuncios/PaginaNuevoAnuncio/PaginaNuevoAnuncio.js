import Layout from "../../layout/Layout";
import Button from "../../common/button";
import { useState } from "react";
import { createAnuncio } from "../service";

import "./PaginaNuevoAnuncio.css"

function PaginaNuevoAnuncio({ history }) {
  const [value, setValue] = useState({
    name: "",
    sale: "all",
    photo: "",
    tags: [],
    price: "",
  });


  const checkModifier = (e) => {
    let multiselect = [...value.tags];
    const changedInput = e.target.name;
    const inputValue = e.target.value;
     if (multiselect.indexOf(inputValue) < 0) {
      multiselect.push(inputValue);
    } else {
      multiselect = multiselect.filter((e) => e !== inputValue);
    }
    setValue({
      ...value,
      [changedInput]: multiselect,
    })
  }
  
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
      console.log(event)
      await createAnuncio(data);
      history.push("/");
    } catch (ex) {
  console.error('outer', ex);
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
          type='checkbox'
          name='sale'
          value={value.sale}
          onChange={handleChange}
        >
          <option value='buy'> Se compra </option>
          <option value='sale'>Se vende</option>
        </select>
        <label htmlFor="tags"> Choose tags </label>
        <div className="select select-multiple">
            <select
              name="tags"
              value={[value.tags]}
              onChange={checkModifier}
              multiple={true}
            >
              <option  name="lifestyle" value="lifestyle" >
                lifestyle
              </option>
              <option name="mobile" value="mobile" >
                mobile
              </option>
              <option name="motor" value="motor" >
                motor
              </option>
              <option name="work" value="work" >
                work
              </option>
          </select>
          <span className="focus"></span>
          </div>
 

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
