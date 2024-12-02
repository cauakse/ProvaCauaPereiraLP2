import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import ESTADO from '../redux/estados';
import { incluirUsuario } from '../redux/usuarioReducer';
import { Link } from 'react-router-dom';

export default function FormCadastro() {

    const [usuario,setUsuario] = useState({})
    const despachante = useDispatch();
    const {estado,mensagem} = useSelector((state)=>state.usuario)

    function manipularMudanca(evento){
        const elemento = evento.target.name;
        const valor = evento.target.value;
        setUsuario({...usuario,[elemento]:valor})
    }

    function manipularSubmissao(evento){
        const form = evento.currentTarget;
        if (form.checkValidity()) {
                despachante(incluirUsuario(usuario))
            }
        evento.preventDefault();
        evento.stopPropagation();
    }


if(estado===ESTADO.OCIOSO)
  return (
    <Form onSubmit={manipularSubmissao}>
      <Form.Group className="mb-3">
        <Form.Label>Nickname</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Digite seu nome" 
        value={usuario.nome}
        name='nickname'
        id='nickname'
        onChange={manipularMudanca}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Url Foto Avatar</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Foto avatar" 
        value={usuario.url}
        name='urlAvatar'
        id='urlAvatar'
        onChange={manipularMudanca}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Senha" 
        id="senha"
        name='senha'
        value={usuario.senha}
        onChange={manipularMudanca}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Confirmar" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Enviar
      </Button>
        <h1>{mensagem}</h1>

    </Form>
  );
  else
  {
    return (
        <h1>{mensagem}</h1>
    )
  }
}