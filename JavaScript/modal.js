//Modal Script
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");

function focusImg(imgElement){
    document.getElementById("carouselExampleIndicators").style.display = "none";
    modal.style.display = "block";
    modalImg.src = imgElement.src;
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    document.getElementById("carouselExampleIndicators").style.display = "block";
    modal.style.display = "none";
}