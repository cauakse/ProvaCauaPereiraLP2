import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { incluirMensagem } from "../redux/mensagensReducer";
export default function TelaNovaMensagem(props){

    const despachante = useDispatch();

    function manipularSubmissao (evento){
        const form = evento.currentTarget;
        if (form.checkValidity()) {
                despachante(incluirMensagem({
                    'mensagem' : document.getElementById('mensagem').value,
                    'usuario' : {
                        'id' : 1
                    }
                }))
            }
        props.setNova(false);
        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <>
        <Form onSubmit={manipularSubmissao}>
          <Form.Group className="mb-3">
            <Form.Label>Mensagem</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Digite sua mensagem" 
            name='mensagem'
            id='mensagem'
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
        </>

      );

}