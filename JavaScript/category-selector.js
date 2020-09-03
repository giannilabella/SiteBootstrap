function selectCategory(card) {
    switch (card) {
        case 0: 
            var element = document.querySelectorAll(".divCard");
            break;
        case 1: 
            var element = document.querySelectorAll(".Acompanhamentos");
            break;
        case 2: 
            var element = document.querySelectorAll(".Saladas");
            break;
        case 3: 
            var element = document.querySelectorAll(".Lanches");
            break;
        case 4: 
            var element = document.querySelectorAll(".Principal");
            break;
        case 5: 
            var element = document.querySelectorAll(".Sobremesas");
            break;
    }

    var allCards = document.querySelectorAll(".divCard");

    for ( var i = 0; i < allCards.length; i++ )
    {
        allCards.item(i).classList.add("hideCard");
    }

    for ( var i = 0; i < element.length; i++ )
    {
        element.item(i).classList.remove("hideCard");
    }
}