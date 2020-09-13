(() => {
    page = window.location.search.substring(6);
    console.log(page)

    page = page === "" ? 1 : page;
    console.log(page)

    fetch(`https://backend-json-server.herokuapp.com/recipes?_page=${page}&_limit=2`)
        .then(response => {
            var links = response.headers.get('Link');
            var pages = links.split(',').map((link) => {
                var formatedLink = link.split(';')[0].replace('<', '').replace('>', '').replace(' ', '').substring(55, link.length-24)
                return formatedLink;
            }) 

            pagination(pages);
            
            return response.json();
        })
        .then(json => render(json))
        .catch(err => alert(err))

    let pgBar = document.getElementById('pgBar');
    for(let i = 0; i <= 100; i++) {
        setTimeout(() => {
            pgBar.style.width = `${i}%`;
        }, 50)
    }
})();


function pagination(pages){
    let firstBtn = document.getElementById('first');
    let prevBtn = document.getElementById('prev');
    let currentBtn = document.getElementById('current');
    let nextBtn = document.getElementById('next');
    let lastBtn = document.getElementById('last');

    firstBtn.href = `./index.html?page=${pages[0]}`
    prevBtn.href = `./index.html?page=${pages[1]}`
    currentBtn.href = `./index.html?page=${Number(pages[2]) - Number(pages[1])}`
    nextBtn.href = `./index.html?page=${pages[2]}`
    lastBtn.href = `./index.html?page=${pages[3]}`
}
    
function render(data){
    let parent = document.getElementById('parentElement');
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

        clockIcon.setAttribute('class', 'fas fa-clock');
        forkIcon.setAttribute('class', 'fas fa-utensils');

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
        