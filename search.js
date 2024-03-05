
////////////////////////////////
const tokenSite = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2MxMjZiNGFkMmE3MGVkMDEyNTdmMDQyOGEzYzcyOSIsInN1YiI6IjY1YjIxODZjNmVlY2VlMDE3YjM0OGE4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2nTkqKDHdztnHo12KTOvpqFCuYUDjBgvyohp38XH7Ms"
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer '+ tokenSite
    }
  };

async function getData(url,options){
    try {
        const data = await fetch(url,options);
        const result = await data.json();
        return result;
    }
    catch (e) {
        console.error("Error : ",e);
    }
}

async function moreMovies(){
    page = page + 1;
    positionNbr = 0
    await actualisation();
}


const searchForm = document.querySelector('#search')
const input = document.querySelector('input')
input.value = ''

let params = {
    keyword : "&with_keywords=",
    lang : "&language=fr-FR",
    sort : "&sort_by=popularity.desc",
    adult: "&include_adult=false",
    include_video: "&include_video=false",
};


searchForm.addEventListener("keyup", function() {
    page = 1;
    actualisation();
});


let positionNbr = 0;
let page = 1;
let id = "#movie-list";

async function actualisation(){
    let lang = "fr-FR"
    let url = "https://api.themoviedb.org/3/search/movie?query="+input.value+"&language="+lang+"&page="+page;
    const request = await getData(url, options);
    const data = request.results

    const container = document.querySelector("#bar-result")
    container.innerHTML = '';

    const existingMoreFilmsBtn = document.querySelector('.more-films-btn');
    if (existingMoreFilmsBtn) {
        existingMoreFilmsBtn.remove();
    }

    for (let i = 0; i < data.length; i++) {
        let id = data[i].id;
        let name = data[i].original_title;
        const date = data[i].release_date;
        let imageUrl = `https://image.tmdb.org/t/p/w500${data[i].poster_path}`;

        if (data[i].poster_path !== null) {
            imageUrl = `https://image.tmdb.org/t/p/w500${data[i].poster_path}`;
        } else {
            imageUrl = '/assets/logo.png';
        }

        const divItem = document.createElement("div");
        divItem.classList.add("movie-item");
        divItem.addEventListener("click", function() {
            window.location.href = "movie.html?id=" + id;
        });

        const image = document.createElement("img");
        image.src = imageUrl;
        image.alt = name;

        const itemTexteDiv = document.createElement("div");
        itemTexteDiv.classList.add("item-texte");

        const title = document.createElement("p");
        title.href = "movie.html?id="+ id;
        title.textContent = name;
        
        const dateBalise = document.createElement("p");
        dateBalise.href = "movie.html?id="+ id;
        dateBalise.textContent = date;

        divItem.appendChild(image);
        itemTexteDiv.appendChild(title);
        itemTexteDiv.appendChild(dateBalise);
        
        container.appendChild(divItem);
        divItem.appendChild(itemTexteDiv);
    }

    const moreFilms = document.createElement("button");
    moreFilms.classList.add('more-films-btn');
    moreFilms.innerText = "Charger plus de films";
    moreFilms.addEventListener("click", moreMovies);
    container.appendChild(moreFilms);
}


function burgerMenu(){
    var toggle = document.getElementById('menu');
    if (toggle.style.display === "block") {
        toggle.style.display = "none";
    } else {
        toggle.style.display = "block";
    }
}

async function displayUsername() {
    if (localStorage && localStorage.username) {
        const username = localStorage.username;
        const usernameContainer = document.getElementById('username');
        usernameContainer.textContent = username;
        usernameContainer.style.pointerEvents = 'none';
    }
}

displayUsername();