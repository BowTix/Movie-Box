////////////////////////////////
const tokenSite = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2MxMjZiNGFkMmE3MGVkMDEyNTdmMDQyOGEzYzcyOSIsInN1YiI6IjY1YjIxODZjNmVlY2VlMDE3YjM0OGE4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2nTkqKDHdztnHo12KTOvpqFCuYUDjBgvyohp38XH7Ms"
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2MxMjZiNGFkMmE3MGVkMDEyNTdmMDQyOGEzYzcyOSIsInN1YiI6IjY1YjIxODZjNmVlY2VlMDE3YjM0OGE4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2nTkqKDHdztnHo12KTOvpqFCuYUDjBgvyohp38XH7Ms'
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


async function requestToken(){
    const request = await getData('https://api.themoviedb.org/3/authentication/token/new', options);
    const tempToken = request.request_token;
    return tempToken;
}

const nameBalise = document.querySelector('#name');
const passwordBalise = document.querySelector('#password');
const submitBalise = document.querySelector('#submit');

async function logIn(){
    const usernameInput = nameBalise.value;
    const passwordInput = passwordBalise.value;
    console.log(usernameInput, passwordInput);
    String(localStorage.setItem('username', usernameInput));
    String(localStorage.setItem('password', passwordInput));
    let testToken = await requestToken();
    if (!(localStorage.getItem('token'))){
        const optionsSignIn = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2MxMjZiNGFkMmE3MGVkMDEyNTdmMDQyOGEzYzcyOSIsInN1YiI6IjY1YjIxODZjNmVlY2VlMDE3YjM0OGE4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2nTkqKDHdztnHo12KTOvpqFCuYUDjBgvyohp38XH7Ms'
            },
            body: JSON.stringify({
                "username" : usernameInput,
                "password" : passwordInput,
                "request_token": testToken,
            })
           };
        
        const reponse = await getData("https://api.themoviedb.org/3/authentication/token/validate_with_login",optionsSignIn);
        console.log(reponse);
        
        Number(localStorage.setItem('token', reponse.request_token));
    }
    else {
       testToken = localStorage.token;
       console.log("1",testToken);
       
    };
    const optionsSignIn = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2MxMjZiNGFkMmE3MGVkMDEyNTdmMDQyOGEzYzcyOSIsInN1YiI6IjY1YjIxODZjNmVlY2VlMDE3YjM0OGE4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2nTkqKDHdztnHo12KTOvpqFCuYUDjBgvyohp38XH7Ms'
        },
        body: JSON.stringify({
            "username" : usernameInput,
            "password" : passwordInput,
            "request_token": testToken,
        })
       };
    const reponse = await getData("https://api.themoviedb.org/3/authentication/token/validate_with_login",optionsSignIn);
    console.log(reponse);  

    window.location.href = "index.html";
}
    
function burgerMenu() {
    var toggle = document.getElementById('menu');
    if (toggle.style.display === "block") {
        toggle.style.display = "none";
    } else {
        toggle.style.display = "block";
    }
}