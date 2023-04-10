

function getData(){
    event.preventDefault();
    
    //selecao de campos
    const month = document.querySelector('#monthnput');
    const tax = document.querySelector('#taxInput');
    const time = document.querySelector('#timeInput');

    //selecao de valores
    let month_value = parseFloat(month.value);
    let tax_value = parseFloat(tax.value);
    let time_value = parseFloat(time.value);
    let tax_part = tax_value/100;


    
    const config = { //defenindo URL para metodo

        method:"POST",
        
        headers:{
            "Content-Type": "application/json"
        },

        body: JSON.stringify({ //transformar em string
            expr:`${month_value}*(((1+${tax_part})^${time_value}-1)/${tax_part})`,
            precision: 4
        })
}

    startFetch(config) //inicia o codigo padrão JS

    console.log(config) //mostra no console a requisição

    let esconder_inicio = document.querySelector('.container-main')
    esconder_inicio.style.display = "none" //mudando classe para esconder
}

function startFetch(object){
    fetch('https://api.mathjs.org/v4/', object) //somando objeto com link (formando url)
    .then(retorno) //recebe dados 
    .then(inserindoHTML) // envia dados para funcao
    .catch(error)  //caso de erro
}

function retorno(response){
    return response.json() //transformar em formato padrão JS
}

function inserindoHTML(data){
    let retorno_consulta = document.querySelector('.ghost-answer') 
    let inserir_resposta_HTML_campo = document.querySelector('.answer')
    let name2 = document.querySelector('#nameInput').value;
    let month2 = document.querySelector('#monthnput').value;
    let tax2 = document.querySelector('#taxInput').value;
    let time2 = document.querySelector('#timeInput').value;
    let html_texto = `<p>Olá ${name2}, com aporte mensal de R$ ${month2} ao longo do periodo de ${time2} anos com juros no valor de ${tax2} voce terá valor final de R$ ${data.result.replace('.', ',')}</p>` //texto para ser inserido com a resposta
    console.log(data)

    retorno_consulta.style.display = 'block' //faz sumir tela para "animar" o restultado
    inserir_resposta_HTML_campo.innerHTML = html_texto //insere texto
}

function error(){
    console.log("Ops, algo deu errado!")
}
