id = window.location.search.substring(4);
            
            (() => {
                    fetch(`https://backend-json-server.herokuapp.com/recipes/${id}`)
                    .then(response => response.json())
                    .then(json => render(json))
                    .catch(err => {
                        document.getElementById('main').style.display = "none";  
                    })
            })();

            function render({category, id, images, name, time, ingredients, steps, portions}){
                document.getElementById('recipeName').innerHTML = name;
                document.getElementById('recipeInfoName').innerHTML = name;
                document.getElementById('recipeCategory').innerHTML = category;
                document.getElementById('time').innerHTML = `Tempo de Preparo: ${time} minutos`;
                document.getElementById('portions').innerHTML = `Rendimento: ${portions} porções`;

                let color;
                switch (category) {
                    case 'Acompanhamentos':
                        color = 'blueviolet';
                        break;
                
                    case 'Saladas':
                        color = 'red';
                        break;
                    
                    case 'Sobremesas':
                        color = 'orange';
                        break;

                    case 'Lanches':
                        color = 'blue';
                        break;

                    case 'Principal':
                        color = 'green';
                        break;

                    default:
                        color = '#555';
                        break;
                }

                document.getElementById('recipeCategory').style.background = color;

                var passos = document.getElementById('prepareSteps');
                var ingredientes = document.getElementById('prepareIngredients');
                var carousel = document.getElementById('divCarousel');
                let amount = document.getElementById('ordenatedList');
                
                steps.map((step) => {
                    listElement = document.createElement('li');
                    listText = document.createTextNode(step);
                    listElement.appendChild(listText);
                    passos.appendChild(listElement);
                })

                ingredients.map((ingr) => {
                    listElement = document.createElement('li');
                    listText = document.createTextNode(ingr);
                    listElement.appendChild(listText);
                    ingredientes.appendChild(listElement);
                })

                images.map((img, index) => {
                    divCar = document.createElement('div');
                    imgCar = document.createElement('img');
                    
                    if(index === 0){
                        divCar.setAttribute('class', 'carousel-item active slide-img');
                    }else{
                        divCar.setAttribute('class', 'carousel-item slide-img');
                    }
                    
                    imgCar.setAttribute('src', img);
                    imgCar.setAttribute('alt', 'Slide');
                    imgCar.setAttribute('onClick', 'focusImg(this)');

                    divCar.appendChild(imgCar);
                    carousel.appendChild(divCar);
                })

                for(let i = 0; i < images.length; i++){
                    itemList = document.createElement('li');
                    itemList.setAttribute("data-target", "#carouselExampleIndicators");
                    itemList.setAttribute("data-slide-to", i);
                    if(i === 0){
                        itemList.setAttribute("class", "active");
                    }

                    amount.appendChild(itemList);
                }
            }