(() => {
    fetch(`https://backend-json-server.herokuapp.com/recipes`)
        .then(response => response.json())
        .then(json => render(json))
})();

function render(data){
    console.log(data);
    let parent = document.getElementById('parentElement');
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
        