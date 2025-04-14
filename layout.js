
// 🔹 DOM Elements
const movieTitle = document.querySelector(".movieTitle");

const bigContainer = document.querySelector(".bigConatiner");
const container = document.querySelector(".container");
const heading = document.querySelector(".heading");



    const searchingButton = document.querySelector(".searchingButton");
    const trendingButton = document.querySelector(".trending");
    const home = document.querySelector(".home");
    const nowPlayingButton = document.querySelector(".nowPlaying");
  
    home.addEventListener("click", function() {
        fetchTopRated();
    });
    
    nowPlayingButton.addEventListener("click", function() {
        nowPlaying();
    });
    trendingButton.addEventListener("click", function() {
       fetchTrending();
    });
    
    
    // 🔹 Search Button Click
    searchingButton.addEventListener("click", function () {
        fetchDataBySearching();
    });



// 🔹 Pressing Enter Key in Search Field
movieTitle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchDataBySearching();
    }
});

function fetchTopRated() {
    heading.innerText = "Top rated Movies";
    let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=d41e0d74fd90ed16c99aae12cd0c1976`;
    fetchData(url);
}

function fetchDataBySearching() {
    heading.innerText = `${movieTitle.value}`;
    let url = `https://api.themoviedb.org/3/search/movie?api_key=d41e0d74fd90ed16c99aae12cd0c1976&query=${movieTitle.value}`;
    fetchData(url);
}

function fetchTrending () {
    heading.innerText = "Trending Movies";
    let url = 'https://api.themoviedb.org/3/trending/movie/day?api_key=d41e0d74fd90ed16c99aae12cd0c1976';
    fetchData(url); 

}

function nowPlaying() {
    heading.innerText = "Now Playing";
    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=d41e0d74fd90ed16c99aae12cd0c1976`;
    fetchData(url);
}


async function fetchData(url) {

    // let url = `https://api.themoviedb.org/3/search/movie?api_key=d41e0d74fd90ed16c99aae12cd0c1976&query=${movieTitle.value}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const length = data.results.length;

        if(length == 0) {
            heading.innerText = "";
            console.log(length,err);
            bigContainer.innerHTML = "";

            const errorDiv = document.createElement("div");
            const errorEmoji = document.createElement("img");
            const errorContent = document.createElement("h1");
        
            errorDiv.classList.add("errorDiv");
            errorEmoji.src = "assets\\Teary_Eyed-removebg-preview.png";
            errorEmoji.classList.add("errorEmoji");
            errorContent.classList.add("errorContent");
        
            errorContent.innerText = `O...O Sorry mate I think you have entered the wrong title. Try again!!`;
        
            errorDiv.appendChild(errorEmoji);
            errorDiv.appendChild(errorContent);
            bigContainer.appendChild(errorDiv);
        } else {
            console.log(length, data);
        const newContainer = document.createElement("div");
        newContainer.classList.add("container");

        for (let i = 0; i < length; i++) {
            const movieDivision = document.createElement("div");
            const movieDetails = document.createElement("div");

            movieDivision.classList.add("content");

            const imgPoster = data.results[i].poster_path;
            const img = document.createElement("img");
            img.src = `https://image.tmdb.org/t/p/w780${imgPoster}`;
            img.alt = "A poster of a movie";

            const title = document.createElement("p");
            const overview = document.createElement("p");
            const releaseDate = document.createElement("p");

            title.innerHTML = `${data.results[i].original_title}`;
            overview.innerHTML = `<b>Over View: </b> ${data.results[i].overview}`;
            releaseDate.innerHTML = `<b>Release Date: </b> ${data.results[i].release_date}`;

            movieDetails.style.display = "none";

            // 🔸 Show details on image click
            img.addEventListener("click", function () {
                movieDetails.style.display = "block";
            });

            movieDetails.appendChild(releaseDate);
            movieDetails.appendChild(overview);

            movieDivision.appendChild(img);
            movieDivision.appendChild(title);
            movieDivision.appendChild(movieDetails);
            newContainer.appendChild(movieDivision);
        }

        // 🔸 Clear old content and show new
        bigContainer.innerHTML = "";
        bigContainer.appendChild(newContainer);
        }
        
        
    }
    catch (err) {
       
            console.log(length,err);
            bigContainer.innerHTML = "";

            const errorDiv = document.createElement("div");
            const errorEmoji = document.createElement("img");
            const errorContent = document.createElement("h1");
        
            errorDiv.classList.add("errorDiv");
            errorEmoji.src = "assets\\Teary_Eyed-removebg-preview.png";
            errorEmoji.classList.add("errorEmoji");
            errorContent.classList.add("errorContent");
        
            errorContent.innerText = `O...O Sorry mate I think you have entered the wrong title. Try again!!`;
        
            errorDiv.appendChild(errorEmoji);
            errorDiv.appendChild(errorContent);
            bigContainer.appendChild(errorDiv);
        
    }
}

// 🔹 Error Message UI
function displayError() {
//
}

fetchTopRated();



