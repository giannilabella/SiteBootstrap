function postRecipe(){
    let name = document.getElementById('nomeReceita').value;
    let time = document.getElementById('tempo').value; 
    let portions = document.getElementById('porcoes').value;
    let category = document.getElementById('categorias').value;
    let images = imagesArray;
    let ingredients = ingredie;
    let steps = prepareSteps;

    console.log(imagesArray);
    console.log(steps);

    let aux = time.split(':');
    time = (Number(aux[0]) * 60) + Number(aux[1]);

    let fullRecipe = {
        name,
        time,
        portions,
        category,
        images,
        ingredients,
        steps
    }

    console.log(fullRecipe);
    console.log(JSON.stringify(fullRecipe));

    fetch('https://backend-json-server.herokuapp.com/recipes', {
        method: 'post',
        body: JSON.stringify(fullRecipe),
        headers: {'Content-type': 'application/json'}
    })
        .then(() => {
            let alertValue = confirm('Receita Criada com sucesso! \nDeseja voltar a página inicial?');

            if(alertValue === true){
                console.log("klwdnakldkl")
                let include = window.location.hostname == '127.0.0.1' ? "../index.html" : "https://gianni-lab.github.io/SiteBootstrap/";
                window.location.href = include;
            }
        })
        .catch(err => alert(err))
}