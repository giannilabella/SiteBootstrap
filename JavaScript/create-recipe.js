
            const file = document.getElementById('file') 
            const img = document.getElementById('img')
            const imgToggle = document.getElementById('imgToggle')

            let arr = [];

            file.addEventListener('change', ev=> {
                    const formData = new FormData();
                    formData.append('image', ev.target.files[0])
                    fetch("https://api.imgur.com/3/image", {
                        method: 'POST',
                        headers:{
                            Authorization: "Client-ID 773b558948a7c0b"
                        },
                        body: formData
                    }).then(data => data.json()).then(data => {
                        let imagemDiv = document.createElement('div');
                        let imagemEl = document.createElement('img');
                        let imagemText = document.createElement('p');

                        
                        imagemEl.src = data.data.link;
                        imagemText.innerText = file.value.substring(12);

                        imagemDiv.setAttribute('class', 'imgBox');
                        imagemEl.setAttribute('class', 'image')

                        imagemDiv.appendChild(imagemEl);
                        imagemDiv.appendChild(imagemText);
                        imgToggle.appendChild(imagemDiv);

                        arr.push(data.data.link);
                    })
            })

            function upload(){
                    let fullRecipe = {
                        name: document.getElementById('name').value,
                        time: document.getElementById('tempo').value,
                        portions: document.getElementById('porcoes').value,
                        category: document.getElementById('categorias').value,
                        ingredients: ingredie,
                        steps: prepareSteps,
                        images: arr
                    }

                    fetch('https://backend-json-server.herokuapp.com/recipes', {
                        method: 'post',
                        body: JSON.stringify(fullRecipe),
                        headers: {'Content-type': 'application/json'}
                    }).catch(err => console.log(err))
            }