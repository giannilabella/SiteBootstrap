function postRecipe(){
    let name = document.getElementById('nomeReceita').value;
    let time = document.getElementById('tempo').value; 
    let portions = document.getElementById('porcoes').value;
    let category = document.getElementById('categorias').value;
    let images = [
        "https://img.imageboss.me/consul/cdn/animation:true/wp-content/uploads/2013/07/featured-image-6356.jpg",
        "https://i.pinimg.com/736x/e6/e4/5f/e6e45f617265dd150d824bf1299cb850.jpg"
    ];
    let ingredients = [...ingredie];
    let steps = [...prepareSteps]

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

    fetch('https://backend-json-server.herokuapp.com/recipes', {
        method: 'post',
        body: JSON.stringify(fullRecipe),
        headers: {'Content-type': 'application/json'}
    })
        .then(() => {
            let alertValue = confirm('Receita Criada com sucesso! \nDeseja voltar a página inicial?');

            if(alertValue === true){
                window.location.href = "../index.html";
            }
        })
        .catch(err => alert(err))
}