const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b6791e213ef63746ab9668107143004b&page=1'

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=b6791e213ef63746ab9668107143004b&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const logo = document.getElementById('logo')
const hotTitle = document.getElementById('hotTitle')

getMovies(API_URL)

async function getMovies(url) {
    try{
        const res = await fetch(url);
        const data = await res.json();
        showMovies(data.results)
    }
    catch(err){
        console.log(err);
    }
        
}

function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach(movie => {
        const {
            title,
            poster_path,
            vote_average,
            overview
        } = movie
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByVote(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
    if(main.offsetHeight == 0 ){
            
        const divEl = document.createElement('div');
        divEl.innerHTML=`<h1 class="sorry">Sorry... Not Found Any Relative Movie</h1>`
        main.appendChild(divEl);
       
    }
}

function getClassByVote(vote){
    if(vote >= 8 ){
        return "green";
    }
    else if(vote >=5){
        return "orange";
    }
    return "red";
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        hotTitle.classList.add('hide');
        search.value = '';
        
    } else {
        search.value = ''
        window.location.reload();
    }
})



