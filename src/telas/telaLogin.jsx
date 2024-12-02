
import { useContext, useRef } from "react";
import { contextoUsuario } from "./telaBatepapo";
import { verificaSenha } from "../service/serviceUsuario";
import { Form, Button } from "react-bootstrap";


export default function TelaLogin (props){
    const nomeUsuario = useRef();
    const senhaUsuario = useRef();
    const setUsuario = useContext(contextoUsuario);

    async function manipularSubmissao(evento){
        evento.preventDefault();
        evento.stopPropagation();
        const usuarioDigitado = nomeUsuario.current.value;
        const senhaDigitada = senhaUsuario.current.value;
        const validaSenha = await verificaSenha({
            'nickname': usuarioDigitado,
            'senha':senhaDigitada
        })
        if(validaSenha.senhaCorreta){
            props.setUsuario({
                'usuario': usuarioDigitado,
                'senha' : senhaDigitada,
                'logado' : true
            })
        }

    }
    return (
        <Form onSubmit={manipularSubmissao}>
          <Form.Group className="mb-3">
            <Form.Label>Nickname</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Digite seu nome" 
            ref={nomeUsuario}
            name='nickname'
            id='nickname'
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control 
            type="password" 
            placeholder="Senha" 
            id="senha"
            name='senha'
            ref={senhaUsuario}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Confirmar" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Entrar
          </Button>
        </Form>
      );
}