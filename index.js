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

function burgerMenu() {
    var toggle = document.getElementById('menu');
    if (toggle.style.display === "block") {
        toggle.style.display = "none";
    } else {
        toggle.style.display = "block";
    }
}

async function moreMovies() {
    positionNbr += 1;
    if (positionNbr == 5) {
        page = page + 1;
        positionNbr = 0
    }
    await filmAffiche(page,positionNbr,url, id, options);
}

let url = "https://api.themoviedb.org/3/movie/popular?language=fr-FR";
let positionNbr = 0;
let page = 1;
let id = "#movie-list";

function raccourciTitreFilm(title, maxLength) {
    if (title.length > maxLength) {
        const dernierEspace = title.lastIndexOf(' ', maxLength);
        if (dernierEspace !== -1) {
            return title.substring(0, dernierEspace) + "...";
        } else {
            return title.substring(0, maxLength - 3) + "...";
        }
    }
    return title;
}

async function filmAffiche(page,positionNbr,url,id,options) {
    const data = await getData(url+'&page='+page, options);
    const positionFilm = document.querySelector(id);
    const li = document.createElement('li');
    positionFilm.appendChild(li);
  
    for (i=0; i< 4;i++) {
      const film = data.results[4*positionNbr +i];
      const image = film.poster_path;
      const title = raccourciTitreFilm(film.title, 40);
      const date = film.release_date;
      const id = film.id;
  
      const div = document.createElement("a");
      div.href = "movie.html?id="+ id
      div.className = "movie-frame"
      li.appendChild(div);

      const imageURL = "https://image.tmdb.org/t/p/w500"+image
      const imageBalise = document.createElement("img");
      imageBalise.src = imageURL;
      div.appendChild(imageBalise);
  
      const titleBalise = document.createElement("h3");
      titleBalise.textContent = title;
      div.appendChild(titleBalise);
      
      const dateBalise = document.createElement("p");
      dateBalise.textContent = "Sortie le " + date;
      div.appendChild(dateBalise);

      const seeMore = document.createElement("a");
      seeMore.className = "see-more";
      
      const icon = document.createElement("i");
      icon.className = "fa-solid fa-magnifying-glass";
      
      seeMore.appendChild(icon);
      seeMore.textContent = "Voir Plus";
      
      const seeMoreDiv = document.createElement("div");
      seeMoreDiv.className = "see-more"
      seeMoreDiv.appendChild(icon);      
      seeMoreDiv.appendChild(seeMore);
      div.appendChild(seeMoreDiv);
      
    }
}

async function displayUsername() {
    const usernameContainer = document.getElementById('username');
    const logoutButton = document.getElementById('logout');

    if (localStorage && localStorage.username) {
        const username = localStorage.username;
        usernameContainer.textContent = username;
        usernameContainer.style.pointerEvents = 'none';
        logoutButton.style.display = 'inline';
    } else {
        usernameContainer.textContent = "Se connecter";
        usernameContainer.style.pointerEvents = 'auto';
        logoutButton.style.display = 'none';
    }
}

function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    window.location.href = "index.html";
}

displayUsername();
filmAffiche(page,positionNbr,url,id,options);
positionNbr++;
filmAffiche(page,positionNbr,url,id,options);
