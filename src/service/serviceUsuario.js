const urlBase = 'https://backend-bcc-2-b.vercel.app/usuario'

export async function cadastrarUsuario(usuario){
    const resposta = await fetch(urlBase,{
        'method':'POST',
        "headers":{
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(usuario)
    })
    const resultado = await resposta.json();
    return resultado;
}

export async function verificaSenha (usuario){
    const resposta = await fetch('https://backend-bcc-2-b.vercel.app/usuario/verificarSenha',
    {
        'method':'POST',
        "headers":{
            'Content-Type':"application/json"
        },
        'body': JSON.stringify(usuario)

    })
    const resultado = await resposta.json();
    return resultado;
}

export async function getUserId (usuarioNome){
    const resposta = await fetch('https://backend-bcc-2-b.vercel.app/usuario' + usuarioNome,
    {
        'method': 'GET',
        "headers":{
            'Content-Type':"application/json"
        },

    })
    const resultado = await resposta.json();
    return resultado;
}