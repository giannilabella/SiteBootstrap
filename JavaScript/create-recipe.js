const HASH_ENCRYPTER = 'ca4c50b905dc21ea17a10549a6f5944f';

const file = document.getElementById('file') 
const img = document.getElementById('img')
const imgToggle = document.getElementById('imgToggle')

let arr = [];

file.addEventListener('change', ev=> {
        let imagemDiv = document.createElement('div');

        imagemDiv.setAttribute('class', 'imgBox')

        imagemDiv.innerHTML = `
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>

            <p class="ml-2">Loading...</p>
        `;

        window.document.body.style.cursor = 'progress'
        
        imgToggle.appendChild(imagemDiv);

        const formData = new FormData();
        formData.append('image', ev.target.files[0])
        fetch("https://api.imgur.com/3/image", {
            method: 'POST',
            headers:{
                Authorization: "Client-ID 773b558948a7c0b"
            },
            body: formData
        }).then(data => data.json()).then(data => {
            imagemDiv.innerHTML = '';

            let imagemEl = document.createElement('img');
            imagemEl.setAttribute('class', 'image');
            imagemEl.src = data.data.link;
            
            
            let imagemText = document.createElement('p');
            imagemText.innerText = ev.target.value.substring(12);
            
            imagemDiv.appendChild(imagemEl);
            imagemDiv.appendChild(imagemText);
            arr.push(data.data.link);

            window.document.body.style.cursor = 'default';
        })
})

function upload(){
    if(validaForm() === 0){
        return 0;
    }else{
        var response = grecaptcha.getResponse();
        if(response.length == 0) {
            alert('Por favor confirme o captcha!')
        }
        else{
            let minutes = Number(document.getElementById('tempo').value.split(':')[1]);
            let hours = Number(document.getElementById('tempo').value.split(':')[0]);
            let semiToken = geraToken();
            let token = md5(semiToken, HASH_ENCRYPTER);
        
            let fullRecipe = {
                name: document.getElementById('name').value,
                time: ((hours*60) + minutes),
                portions: document.getElementById('porcoes').value,
                category: document.getElementById('categorias').value,
                ingredients: ingredie,
                steps: prepareSteps,
                images: arr,
                token
            }
        
            fetch('https://backend-json-server.herokuapp.com/recipes', {
                method: 'post',
                body: JSON.stringify(fullRecipe),
                headers: {'Content-type': 'application/json'}
            })
            .then(data => {
                if(data.status === 201){
                    let alertValue = confirm('Receita Criada com sucesso! \nDeseja voltar a página inicial?');
                    if(alertValue === true){
                        let redirect = window.location.hostname == 'localhost' ? `./token.html?token=${semiToken}` : `https://gianni-lab.github.io/SiteBootstrap/Pages/token.html?token=${semiToken}`;
                        window.location.href = redirect;
                    }
                }
            })
            .catch(err => console.log(err))
        }
    }
}

function validaForm(){
    let validateItem;
    let emptyString;
    const inputIds = ['name', 'tempo', 'porcoes', 'categorias']

    for(let value of inputIds){
        validateItem = document.getElementById(value);
        emptyString = value === 'categorias' ? "Escolha..." : "";
        if(validateItem.value === emptyString){
            validateItem.classList.add('obri');
            validateItem.focus();
            return 0;
        }else{
            validateItem.classList.remove('obri');
        }
    }

    validateItem = document.getElementById('label-file');
    if(arr.length === 0){
        validateItem.classList.add('obri')
        return 0;
    }else{
        validateItem.classList.remove('obri');
    }

    validateItem = document.getElementById('ingredient-to-add');
    if(ingredie.length === 0){
        validateItem.classList.add('obri')
        validateItem.focus();
        return 0;
    }else{
        validateItem.classList.remove('obri');
    }

    validateItem = document.getElementById('step-to-add');
    if(prepareSteps.length === 0){
        validateItem.classList.add('obri');
        validateItem.focus();
        return 0;
    }else{
        validateItem.classList.remove('obri');
    }

    return 1;
}

function geraToken(){
    let token = "";
    let vb = "";
    for(let i = 0; i < 10; i++){
        vb = Math.floor(Math.random() * 10);
        if((i === 3) || (i === 7)) token += '-';
        token += vb;
    }

    return token;
}