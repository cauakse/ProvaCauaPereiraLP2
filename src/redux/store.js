import {configureStore} from "@reduxjs/toolkit";
import usuarioReducer from '../redux/usuarioReducer.js';
import mensagensReducer from "./mensagensReducer.js";

const store = configureStore({
    reducer:{
        'usuario':usuarioReducer,
        'mensagem' : mensagensReducer
    }
});
export default store;