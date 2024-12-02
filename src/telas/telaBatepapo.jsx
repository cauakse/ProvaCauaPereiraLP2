import { createContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import TelaLogin from "./telaLogin";
import Button from 'react-bootstrap/Button';
import { consultarAllMensagens } from "../redux/mensagensReducer";
import TelaNovaMensagem from "./telaNovaMensagem";
import { getUserId } from "../service/serviceUsuario";

export const contextoUsuario = createContext();

export default function TelaBatepapo(){
    const [usuario,setUsuario] = useState({
        "usuario": "",
        'senha' : '',
        "logado" : false
    })

    const id =0;
    const {estado,mensagem,listaDeMensagens} = useSelector((state)=>state.mensagem)
    const despachante = useDispatch();
    const [nova,setNova] = useState(false);

    useEffect(()=>{
        despachante(consultarAllMensagens())
    },[despachante,nova])

    if(!usuario.logado){
        return (
            <>
                <contextoUsuario.Provider>
                    <TelaLogin setUsuario={setUsuario}></TelaLogin>
                </contextoUsuario.Provider>
            </>        
        )
    }
    else
    {

        if(!nova)
        return(
            <>
                <h1>Ola {usuario.usuario}</h1>
                <Button variant="primary" onClick={()=>{
                    setNova(true);
                }}>Clique para cadastrar nova mensagem</Button>
                <h2>Lista de mensagens:</h2>
                {listaDeMensagens.map((mensagem)=>{
                    return(
                        <div style={{'backgroundColor':'gray','margin':'10px','maxWidth':'30%'}}>
                            <h3>{mensagem.mensagem}</h3>
                            <h4>{mensagem.usuario.nickname}</h4>
                        </div>
                    )
                })}
            </>
        )
        else
        {
            return(
            <TelaNovaMensagem setNova={setNova} id={usuario}></TelaNovaMensagem>
            )
        }
    }

}


