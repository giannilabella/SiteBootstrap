function selectCategory(card) {
    switch (card) {
        case 0: 
            var element = document.querySelectorAll(".divCard");
            break;
        case 1: 
            var element = document.querySelectorAll(".acomp");
            break;
        case 2: 
            var element = document.querySelectorAll(".salada");
            break;
        case 3: 
            var element = document.querySelectorAll(".lanche");
            break;
        case 4: 
            var element = document.querySelectorAll(".princ");
            break;
        case 5: 
            var element = document.querySelectorAll(".sobre");
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