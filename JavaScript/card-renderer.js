let parent = document.getElementById('parentElement');
var page = window.location.search.substring(6);
let pagesDiv = document.getElementById('pagination');

page = page === "" ? 1 : Number(page);
const LIMIT = 9;

(() => {

    if(page < 1){
        parent.innerHTML = "";
        pagesDiv.innerHTML = "<h1>Página não encontrada</h1>";
    }else{
        fetch(`https://backend-json-server.herokuapp.com/recipes?_page=${page}&_limit=${LIMIT}`)
            .then(response => {         
                let recipesTotal = response.headers.get('X-Total-Count');
                let lastPage = Math.ceil(recipesTotal / LIMIT);

                let prevBtn = document.getElementById('prev');
                let nextBtn = document.getElementById('next');    
            
                if(page > lastPage){
                    parent.innerHTML = "";
                    pagesDiv.innerHTML = "<h1>Página não encontrada</h1>";
                }
                if(page !== 1){
                    prevBtn.href = `./index.html?page=${page - 1}`;
                }else{
                    prevBtn.classList.add('disabled');
                }
    
                if(page !== lastPage){
                    nextBtn.href = `./index.html?page=${page + 1}`;
                }else{
                    nextBtn.classList.add('disabled');
                }
                
                return response.json();
            })
            .then(json => render(json))
            .catch(err => alert(err))
    }

    let pgBar = document.getElementById('pgBar');
    for(let i = 0; i <= 100; i++) {
        setTimeout(() => {
            pgBar.style.width = `${i}%`;
        }, 50)
    }
})();
    
function render(data){
    parent.innerHTML = "";
    data.map(({id, name, category, time, portions, images, ingredients, steps}) => {
        //Elementos
        divCardColumn = document.createElement('div');
        divCard = document.createElement('div');
        cardImg = document.createElement('img');
        cardBody = document.createElement('div');
        cardTitle = document.createElement('h5');
        cardTextTime = document.createElement('p');
        cardTextPortions = document.createElement('p');
        cardLink = document.createElement('button');
        clockIcon = document.createElement('i');
        forkIcon = document.createElement('i');
        formEl = document.createElement('form');
        inputEl = document.createElement('input');

        //Textos
        titleText = document.createTextNode(name);
        timeText = document.createTextNode(`Preparo: ${time} minutos`);
        portionsText = document.createTextNode(`Rendimento: ${portions} porções`);
        linkText = document.createTextNode('Ver receita');

        //Atributos
        if(images.length === 0){
            images = ["https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"];
        }
        cardImg.setAttribute('src', images[0]);
        cardImg.setAttribute('alt', name);
        cardLink.setAttribute('type', 'submit');
        formEl.setAttribute('action', 'Pages/item.html');
        formEl.setAttribute('method', 'GET');
        inputEl.setAttribute('type', 'text');
        inputEl.setAttribute('name', 'id');
        inputEl.setAttribute('value', id);
        inputEl.setAttribute('class', 'invisible');

        //Classes
        divCardColumn.setAttribute('class', `col-md-4 col-sm-12 ${category} divCard`);
        
        divCard.setAttribute('class', 'card');
        
        cardImg.setAttribute('class', 'card-img-top img-fluid card-img');

        cardBody.setAttribute('class', 'card-body');

        cardTitle.setAttribute('class', 'card-title');
        
        cardTextTime.setAttribute('class', 'card-text preparo');

        cardTextPortions.setAttribute('class', 'card-text rendimento');
        
        cardLink.setAttribute('class', 'btn btn-info');

        clockIcon.setAttribute('class', 'fas fa-clock icon');
        forkIcon.setAttribute('class', 'fas fa-utensils icon');

        //Montagem dos Elementos
        cardLink.appendChild(linkText);
        cardTextPortions.appendChild(forkIcon);
        cardTextPortions.appendChild(portionsText);
        cardTextTime.appendChild(clockIcon);
        cardTextTime.appendChild(timeText);
        cardTitle.appendChild(titleText);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardTextTime);
        cardBody.appendChild(cardTextPortions);
        formEl.appendChild(inputEl);
        formEl.appendChild(cardLink);
        cardBody.appendChild(formEl);
        divCard.appendChild(cardImg);
        divCard.appendChild(cardBody);
        divCardColumn.appendChild(divCard);
        parent.appendChild(divCardColumn);
    })
}
        