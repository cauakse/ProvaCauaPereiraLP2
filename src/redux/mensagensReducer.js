import { createSlice } from "@reduxjs/toolkit";
import ESTADO from "./estados.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarMensagens, gravarMensagem } from "../service/serviceMensagem.js";

const mensagemReducer = createSlice({
    name:'mensagem',
    initialState:{
        'estado' : ESTADO.OCIOSO,
        'mensagem' : "",
        'listaDeMensagens' : []
    },
    reducers:{},

    extraReducers:(builder) =>{
        builder.addCase(consultarAllMensagens.pending,(state,action)=>{
            state.estado = ESTADO.PENDENTE
            state.mensagem = 'PROCESSANDO REQUISIÇÃO (RECUPERANDO MENSAGENS)'
            state.listaDeMensagens = []
        })
        .addCase(consultarAllMensagens.fulfilled, (state,action)=>{
            if(action.payload.status){
                state.estado = ESTADO.OCIOSO
                state.mensagem = action.payload.mensagem
                state.listaDeMensagens = action.payload.listaDeMensagens
            }
            else
            {
                state.estado = ESTADO.ERRO
                state.mensagem = action.payload.mensagem
                state.listaDeMensagens = action.payload.listaDeMensagens
            }
        })
        .addCase(consultarAllMensagens.rejected, (state,action)=>{
            state.estado = ESTADO.ERRO
            state.mensagem = action.payload.mensagem
            state.listaDeMensagens = []
        })
        .addCase(incluirMensagem.pending,(state,action)=>{
            state.estado = ESTADO.PENDENTE
            state.mensagem= "PROCESSANDO REQUISICAO (INCLUIR MENSAGEM)"
        })
        .addCase(incluirMensagem.fulfilled, (state,action)=>{
            if(action.payload.status){
                state.estado = ESTADO.PENDENTE
                state.mensagem = action.payload.mensagem
            }
            else
            {
                state.estado = ESTADO.ERRO
                state.mensagem = action.payload.mensagem
            }
        })
        .addCase(incluirMensagem.rejected,(state,action)=>{
            state.estado = ESTADO.ERRO
            state.mensagem = action.payload.mensagem
        })
    }
})

export const consultarAllMensagens = createAsyncThunk('consultarAllMensagens' , async ()=>{
    try{
        const resultado = await consultarMensagens();
        if(resultado.status){
                return({
                    'status': true,
                    'mensagem': "Mensagens resgatadas com sucesso",
                    'listaDeMensagens': resultado.listaMensagens
                }
                )
        }
        else
        {
            return({
                'status': false,
                'mensagem': "Erro ao resgatar as mensagens",
                'listaDeMensagens': []
            }
            )
        }
    }catch(e){
        return({
            'status': false,
            'mensagem': "ERRO " + e.message,
            'listaDeMensagens': []
        }
        )
    }
})

export const incluirMensagem = createAsyncThunk('incluirMensagem', async (mensagem)=>{
    try{
        const resultado = await gravarMensagem(mensagem);
        if(resultado.status){
                return({
                    'status': true,
                    'mensagem': "Mensagem incluida com sucesso",
                }
                )
        }
        else
        {
            return({
                'status': false,
                'mensagem': "Erro ao incluir mensagem",
            }
            )
        }
    }catch(e){
        return({
            'status': false,
            'mensagem': "ERRO " + e.message,
        }
        )
    }
})

export default mensagemReducer.reducer
    