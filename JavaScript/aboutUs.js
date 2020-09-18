let mediaqueryvalue = 0;

const mediaqueryFunction = (x) => {
    if (x.matches) { // If media query matches
        mediaqueryvalue = 1;
    } else {
        mediaqueryvalue = 0;
    }
}

var x = window.matchMedia("(max-width: 600px)");
mediaqueryFunction(x);
x.addListener(mediaqueryFunction);

function togglefocus(e) {
    if (e.classList.contains('unfocused')) {
        dev1.classList.toggle("unfocused");
        dev2.classList.toggle("unfocused");
    }
}

const depurateMonth = (month, option) => {
    let months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"]; //short

    if (option == 'long')
        months = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

    return months[Number(month) - 1];
}

const changeDateLabel = (e, mouseoverState) => {
    if (mouseoverState === 1 || mediaqueryvalue == 1)
    {
        let day = e.getAttribute('dia');
        let month = depurateMonth(e.getAttribute('mes'), 'long');
        let year = e.getAttribute('ano');

        e.innerHTML = `${day} de ${month} de ${year}`;
    }
    else
    {
        let day = e.getAttribute('dia');
        let month = depurateMonth(e.getAttribute('mes'), 'short');

        e.innerHTML = `${day} ${month}`;
    }
}

const max_caracter = 60;

(() => {
    fetch(`https://api.github.com/repos/gianni-lab/sitebootstrap/commits`)
        .then(response => response.json())
        .then(json => loadCommits(json))
})();

const loadCommits = (data) => {
    for(let i = 0; i < 4; i++){
        let divEl = document.querySelector('.updates-info .content');
        let divUpEl = document.createElement('div');
        let divDateEl = document.createElement('div');
        let divInfoEl = document.createElement('div');
        let divDescEl = document.createElement('div');
        let divAuthorEl = document.createElement('div');

        divUpEl.setAttribute('class', 'update');
        divDateEl.setAttribute('class', 'date');
        divInfoEl.setAttribute('class', 'info');
        divDescEl.setAttribute('class', 'desc');
        divAuthorEl.setAttribute('class', 'author');

        divDateEl.setAttribute('onmouseover', 'changeDateLabel(this, 1)');
        divDateEl.setAttribute('onmouseout', 'changeDateLabel(this, 0)');
        
        //Formatação do dia e do mês
        let dateArr = data[i].commit.author.date.split('T')[0].split('-');
        let day = dateArr[2];

        let month = depurateMonth(dateArr[1], 'short');

        divDateEl.setAttribute('ano', dateArr[0]);
        divDateEl.setAttribute('mes', dateArr[1]);
        divDateEl.setAttribute('dia', dateArr[2]);

        //Formatação do tamanho limite da mensagem
        let formatedMsg;
        if(data[i].commit.message.length > max_caracter){
            formatedMsg = data[i].commit.message.substring(0, (max_caracter - 4)) + " ..."
        }else{
            formatedMsg = data[i].commit.message;
        }

        let authorName = data[i].commit.author.name;
        
        //Atribuição dos valores aos elementos
        let descText = document.createTextNode(formatedMsg);
        let authorText = document.createTextNode(authorName);

        // divDateEl.appendChild(dateText);
        divDateEl.innerHTML = `${day} ${month}`;
        divDescEl.appendChild(descText);
        divAuthorEl.appendChild(authorText);

        divInfoEl.appendChild(divDescEl);
        divInfoEl.appendChild(divAuthorEl);

        divUpEl.appendChild(divDateEl);
        divUpEl.appendChild(divInfoEl);

        divEl.appendChild(divUpEl);

        changeDateLabel(divDateEl, 0);
    }
}

const updatelink = () => {
    const text = document.querySelector('#messageinput').value;
    const linkEl = document.querySelector('#sendmessage');

    linkEl.setAttribute('href', `https://wa.me/5519987654321?text=${text}`);
}