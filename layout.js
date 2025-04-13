console.log('working');
const movieTitle = document.querySelector(".movieTitle");
const searchingButton = document.querySelector(".searchingButton");
const bigContainer = document.querySelector(".bigConatiner");
const container = document.querySelector(".container");


searchingButton.addEventListener("click", function(){
    fetchDAta();
});

movieTitle.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchDAta();
    }
});

async function fetchDAta() {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=d41e0d74fd90ed16c99aae12cd0c1976&query=${movieTitle.value}`; 
    try {
        const response = await fetch(url);
        const data = await response.json();
        let length = Object.keys(data).length; // to know how many movies are under the same title

        let newContainer = document.createElement("div");
        newContainer.classList.add("container");
        
        for(let i = 0; i< length ; i++) {

         //division for the detail about the movie("poster, title, release date and over view ")
            let movieDivision = document.createElement("div");

            movieDivision.classList.add("content"); 
            let imgPoster  = data.results[i].backdrop_path;
            const img = document.createElement("img");
            img.src = `https://image.tmdb.org/t/p/w780${imgPoster}`;
            img.alt = "A poster of a movie";
    
            const title = document.createElement("p");
            const overview = document.createElement("p");
            const releaseDate = document.createElement("p");

            title.innerHTML = `<b>Title: </b> ${data.results[i].original_title}`;
            overview.innerHTML = `<b>Over View: </b> ${data.results[i].overview}`;
            releaseDate.innerHTML = `<b>Release Date: </b> ${data.results[i].release_date}`;

            movieDivision.appendChild(img);
            movieDivision.appendChild(title);
            movieDivision.appendChild(overview);
            movieDivision.appendChild(releaseDate);
            newContainer.appendChild(movieDivision);
        }
        bigContainer.innerHTML = ""; // clearing the previous contents in the page
        bigContainer.appendChild(newContainer);
    }
    catch(err) {
        bigContainer.innerHTML = "";

        let errorDiv = document.createElement("div"); 
        let errorEmoji = document.createElement("img");
        let errorContent = document.createElement("h1"); 

        errorDiv.classList.add("errorDiv");
        errorEmoji.src = "assets\\Teary_Eyed-removebg-preview.png";
        errorEmoji.classList.add("errorEmoji");    
        errorContent.innerText = `O...O Sorry mate i think you have entered the wrong title try again!!`;
        errorContent.classList.add("errorContent");

        errorDiv.appendChild(errorEmoji);
        errorDiv.appendChild(errorContent);
        bigContainer.appendChild(errorDiv);
        
        // the above code creates 
        // <div>
        //     <img> 
        //      <h1> </h1>
        // </div>
    }
}