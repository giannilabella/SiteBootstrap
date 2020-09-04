            let ingredie = [];
            let prepareSteps = [];

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