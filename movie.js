let url = window.location.search;
const id = url.split('=')[1];    

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

async function miseEnForme(){
    const container = document.querySelector("#main")

    let lang = "fr-FR"
    let request = "https://api.themoviedb.org/3/movie/" + id + "?language=" + lang;
    const information = await getData(request,options);

    const title = information.title;
    const image = information.backdrop_path;
    const overwiew = information.overview;
    const popularity = information.popularity;
    const release_date = information.release_date;
    const vote_average = information.vote_average.toFixed(1);
    const vote_count = information.vote_count;
    
    const titleBalise = document.querySelector("#filmTitle");
    titleBalise.textContent = title

    const release_dateBalise = document.createElement("p");
    release_dateBalise.textContent = "Date de sortie : " + release_date

    const vote_averageBalise = document.createElement("p");
    vote_averageBalise.textContent = "Note moyenne : "+ vote_average+"/10 sur "+ vote_count+" votes";

    const statsDiv = document.createElement("div");
    statsDiv.classList.add("film-stats");

    const imageTitleDiv = document.createElement("div");
    imageTitleDiv.classList.add("image-txt");

    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-container");
    const overwiewDiv = document.createElement("div");
    overwiewDiv.classList.add("overview-container");

    const imageBalise = document.createElement("img");
    imageBalise.src = "https://image.tmdb.org/t/p/w500/"+image;

    const overwiewBalise = document.createElement("p");
    overwiewBalise.textContent = overwiew ? overwiew : "Pas de synopsis disponible actuellement. Veuillez nous excuser pour la gêne occasionnée." ;

    statsDiv.appendChild(release_dateBalise);
    statsDiv.appendChild(vote_averageBalise);

    imageDiv.appendChild(imageBalise);
    overwiewDiv.appendChild(overwiewBalise);
    
    imageTitleDiv.appendChild(imageDiv);
    imageTitleDiv.appendChild(overwiewDiv);

    container.appendChild(imageTitleDiv)
    container.appendChild(statsDiv);
}
miseEnForme()

let positionNbr = 0
let page = 1

async function moreCommentaire() {
    positionNbr += 1
    await commentaire(page,positionNbr, id, options);
}

commentaire(page,positionNbr,id, options);
async function commentaire(page,positionNbr,id,options) {
    console.log(id)
    let url = "https://api.themoviedb.org/3/movie/"+id+"/reviews"+"?page="+page
    
    const data = await getData(url,options);
    
    for (i=0; i< 4;i++) {
        if (4*positionNbr +i< data.results.length) {
        const positionComments = document.querySelector("#comments");
        const li = document.createElement('li');
        positionComments.appendChild(li);
  
        const commentaire = data.results[4*positionNbr +i];
        
        
        const divAuthor = document.createElement("div");
        divAuthor.classList.add("div-auteur");
        const divCommentaire = document.createElement("div");
        divCommentaire.classList.add("div-commentaire");
        li.appendChild(divAuthor);
        li.appendChild(divCommentaire);

        const author = commentaire.author_details;
        const name = author.name;
        const rating = author.rating;
        const avatar_path = author.avatar_path;
        
        const defaultAvatarUrl = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
        const avatarSrc = avatar_path ? "https://image.tmdb.org/t/p/w500" + avatar_path : defaultAvatarUrl;

        const imageBalise = document.createElement("img");
        imageBalise.src = avatarSrc;
        divAuthor.appendChild(imageBalise);

        const divCommune = document.createElement("div");
        divCommune.classList.add("rating-container");
        
        const nameBalise = document.createElement("p");
        if (name === '') {
            nameBalise.textContent = "Utilisateur Anonyme";
        } else {
            nameBalise.textContent = name;
        }

        const ratingBalise = document.createElement("p");
        if (rating === null) {
            ratingBalise.textContent = "Pas de note :(";
        } else {
            ratingBalise.textContent = "Note : " + rating + "/10";
        }
        
        divCommune.appendChild(nameBalise);
        divCommune.appendChild(ratingBalise);
        
        divAuthor.appendChild(divCommune);

        const content = commentaire.content;
        const created = commentaire.created_at.slice(0, 10);
        const updated = commentaire.updated_at.slice(0, 10);

        const contentBalise = document.createElement('p');
        if (content ==""){
            contentBalise.textContent = "Pas de commentaire :(";
        }
        else {
            contentBalise.textContent = "Commentaire : " + content;
        }
        const divCommuneBalise = document.createElement('div');
        divCommuneBalise.classList.add('comment-dates');
        const createdBalise = document.createElement('p');
        createdBalise.textContent = "Crée le : " + created;
        const updatedBalise = document.createElement('p');
        updatedBalise.textContent = "Mis à jour le : " + updated;

        divCommentaire.appendChild(contentBalise);
        divCommentaire.appendChild(divCommuneBalise);

        divCommuneBalise.appendChild(createdBalise);
        divCommuneBalise.appendChild(updatedBalise);
        }
    else if (4*positionNbr +i == data.results.length) {
        const noComentaire = document.querySelector("#noCommentaire");
        noComentaire.textContent = "Pas de commentaire :("
        const moreButton = document.querySelector(".more-btn");
        moreButton.remove();
        console.log("printing")
        return
    }
    else
    {
        positionNbr = 0
        page ++;
        return
    }
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

console.log(localStorage.token);

if (localStorage.token ) {
    const containerReview = document.querySelector(".addReview");
    const formReview = document.createElement("form");
    const titleReview = document.createElement("p");
    const starRating = document.createElement("div");
    starRating.className = "star-rating";
    const stars = [];
    for (let i = 0; i < 5; i++) {
        const star = document.createElement("span");
        star.className = "star";
        star.innerHTML = "&#9733;";
        stars.push(star);
        star.addEventListener("click", () => {
            setRating(i + 1);
        });
        starRating.appendChild(star);
    }

    formReview.className = "review";
    titleReview.textContent = "Ajouter une note : ";
   
    containerReview.appendChild(formReview);
    formReview.appendChild(titleReview);
    formReview.appendChild(starRating);

    let ratingValue = 0;

    function setRating(value) {
        ratingValue = value;
        stars.forEach((star, i) => {
            if (i < value) {
                star.classList.add("selected");
            } else {
                star.classList.remove("selected");
            }
        });

    }
    formReview.addEventListener("click", addReview);

    async function addReview(event) {
        event.preventDefault();
        const urlReview = "https://api.themoviedb.org/3/movie/" + id + "/rating";
        const reviewContent = "test";
        const optionsReview = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2MxMjZiNGFkMmE3MGVkMDEyNTdmMDQyOGEzYzcyOSIsInN1YiI6IjY1YjIxODZjNmVlY2VlMDE3YjM0OGE4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2nTkqKDHdztnHo12KTOvpqFCuYUDjBgvyohp38XH7Ms'
            },
            body: JSON.stringify({ "value": ratingValue*2, "content": reviewContent })
        };

        console.log(optionsReview);
        const response = await getData(urlReview, optionsReview);
        console.log(response);

        alert("Note enregistrée, merci pour votre contribution");
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
