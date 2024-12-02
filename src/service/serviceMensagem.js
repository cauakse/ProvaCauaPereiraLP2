const urlBase = 'https://backend-bcc-2-b.vercel.app/mensagem';

export async function consultarMensagens(){
    const resposta = await fetch(urlBase,{
        'method':'GET',
        "headers":{
            'Content-Type':"application/json"
        }
    })
    const resultado = await resposta.json();
    return resultado;
}

export async function gravarMensagem(mensagem){
    const resposta = await fetch(urlBase,
        {
            'method': 'POST',
            "headers":{
                'Content-Type':"application/json"
            },
            'body': JSON.stringify(mensagem)
        })
}