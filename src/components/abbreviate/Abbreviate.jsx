import React from 'react';

const Abbreviate = ({ texto, limite = 100 }) => {
  const textoAbreviado = texto.length > limite ? texto.substr(0, limite) + '...' : texto;

  return <span>{textoAbreviado}</span>;
};

export default Abbreviate;
