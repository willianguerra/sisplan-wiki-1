import axios from 'axios';

export const apiSisplan = axios.create({
  baseURL: "http://aplicativo.sisplansistemas.com.br:10441/",
});

export const apiWeb = axios.create({
  baseURL: "http://aplicativo.sisplansistemas.com.br:10442",
});