const max_caracter = 60;

(() => {
    fetch(`https://api.github.com/repos/gianni-lab/sitebootstrap/commits`)
        .then(response => response.json())
        .then(json => loadCommits(json))
})();

function loadCommits(data){
    for(let i = 0; i < 3; i++){
        let divEl = document.getElementById('commits');
        let divUpEl = document.createElement('div');
        let divDateEl = document.createElement('div');
        let spanEl = document.createElement('span');

        divUpEl.setAttribute('class', 'update');
        divDateEl.setAttribute('class', 'data');
        
        //Formatação do dia e do mês
        let dateArr = data[i].commit.author.date.split('T')[0].split('-');
        let day = dateArr[2];

        let months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
        let month = months[Number(dateArr[1]) - 1];

        //Formatação do tamanho limite da mensagem
        let formatedMsg;
        if(data[i].commit.message.length > max_caracter){
            formatedMsg = data[i].commit.message.substring(0, (max_caracter - 4)) + " ..."
        }else{
            formatedMsg = data[i].commit.message;
        }
        
        //Atribuição dos valores aos elementos
        let spanText = document.createTextNode(formatedMsg);
        let dateText = document.createTextNode(`${day}\n${month}`);

        spanEl.appendChild(spanText);
        divDateEl.appendChild(dateText);
        divUpEl.appendChild(divDateEl);
        divUpEl.appendChild(spanEl);
        divEl.appendChild(divUpEl);
    }
}