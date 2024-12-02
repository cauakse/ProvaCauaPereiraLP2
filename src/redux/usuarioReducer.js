import { createSlice } from "@reduxjs/toolkit";
import ESTADO from "./estados.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { cadastrarUsuario } from "../service/serviceUsuario.js";


const usuarioReducer = createSlice({
    name:'usuario',
    initialState: {
    'estado' :ESTADO.OCIOSO,
    'mensagem' : ""
    }
    ,
    reducers:{},
    extraReducers: (builder) =>{
        builder.addCase(incluirUsuario.pending, (state,action) =>{
            state.estado = ESTADO.PENDENTE
            state.mensagem = "PROCESSANDO REQUISIÇÃO (INCLUIR USUARIO)"
        })
        .addCase(incluirUsuario.fulfilled, (state,action) =>{
            if(action.payload.status){
                state.estado=ESTADO.OCIOSO
                state.mensagem = action.payload.mensagem
            }
            else
            {
                state.estado=ESTADO.ERRO
                state.mensagem=action.payload.mensagem
            }
        })
        .addCase(incluirUsuario.rejected,(state,action)=>{
            state.estado=ESTADO.ERRO
            state.mensagem=action.payload.mensagem
        })

    }
})

export const incluirUsuario = createAsyncThunk('incluirUsuario', async (usuario)=>{
    try{
        const resultado = await cadastrarUsuario(usuario);
        if(resultado.status){
            return{
                'status' : true,
                'mensagem': "Usuario cadastrado com sucesso"
            }
        }
        else
        {
            return{
                'status' :false,
                'mensagem' : "Erro ao cadastrar usuario"
            }
        }
    }catch(e){
        return{
            'status' : false,
            'mensagem' :"ERRO " + e.message
        }
    }

})

export default usuarioReducer.reducer