let ingredie = [];
let prepareSteps = [];

function copyText(link){
    link.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

function addImageNames(img) {
    const input = document.getElementById('input-upload');
    const names = [];

    Object
        .keys(input.files)
        .map((key, index) => {
            names.push(input.files[key].name);
        });

    const namesDiv = document.getElementById('added-images');
    namesDiv.innerHTML = '';

    names.map((name) => {
        const pElement = document.createElement('p');
        const pText = document.createTextNode(name);
        const iconEl = document.createElement('i')
        iconEl.setAttribute('class', 'far fa-copy');
        iconEl.setAttribute('onclick', `copyText("${img}")`);
        
        pElement.appendChild(iconEl);
        pElement.appendChild(pText);
        namesDiv.appendChild(pElement);
    });
};

function addIngredient(){
    let ingr = document.getElementById('ingredient-to-add').value;

    if(ingr !== ''){
        let ingrDiv = document.getElementById('added-ingredients');

        let pElement = document.createElement('p');
        let pText = document.createTextNode(ingr);

        pElement.appendChild(pText);
        ingrDiv.appendChild(pElement);

        ingredie.push(ingr);
    }

    document.getElementById('ingredient-to-add').value = "";
}

function addStep(){
    let step = document.getElementById('step-to-add').value;

    if(step !== ''){
        let stepDiv = document.getElementById('added-steps');

        let pElement = document.createElement('p');
        let pText = document.createTextNode(step);

        pElement.appendChild(pText);
        stepDiv.appendChild(pElement);

        prepareSteps.push(step);
    }

    document.getElementById('step-to-add').value = "";
}