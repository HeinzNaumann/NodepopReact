import client from "../../api/client";

const anunciosBaseUrl = "api/v1";

export const getUltimosAnuncios = () => {
  const url = `${anunciosBaseUrl}/adverts`;
  return client.get(url);
};

export const createAnuncio = anuncio => {
  const url = `${anunciosBaseUrl}/adverts`;

  return client.post(url, anuncio);
};

export const getUltimoAnuncio = id => {
  const url = `${anunciosBaseUrl}/adverts/${id}`;
  return client.get(url);
};

export const deleteAnuncio = id => {
  const url = `${anunciosBaseUrl}/adverts/${id}`;
  return client.delete(url);
};
