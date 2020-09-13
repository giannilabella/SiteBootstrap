function search(){
    document.getElementById('parentElement').innerHTML = "";

    let searchValue = document.getElementById('busca').value;

    fetch(`https://backend-json-server.herokuapp.com/recipes?name_like=${searchValue}`)
        .then(response => response.json())
        .then(json => render(json))
}