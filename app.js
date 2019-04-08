
window.onload = function(){
    getTrending();
  };

  const form = document.querySelector('#search_form');
  const responseContainer = document.querySelector('#movie_container');
  
      form.addEventListener('submit', function (e) {
          const searchField = document.querySelector('#search__movie').value;
          e.preventDefault();
          responseContainer.innerHTML = '';
          fetch(`https://api.themoviedb.org/3/search/movie?query=${searchField}&api_key=7bb1aac57e9d82f295a49ce08e8694ea`)
          .then(response => response.json()) 
          .then(addMovies)
          .catch(e => requestError(e, 'search error'));
      });
  
      function addMovies(data){
          console.log(data);
         for(let i =0; i< data.results.length; i++){
          let title = data.results[i].title;
          responseContainer.insertAdjacentHTML('afterbegin', `<li>${title}</li>`);
         }
      }
  
      function requestError(e) {
          console.log(e);
      }

function getTrending() {
        const responseContainer = document.querySelector('#movie_container');
        responseContainer.innerHTML = '';
        fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=7bb1aac57e9d82f295a49ce08e8694ea`)
        .then(response => response.json()) 
        .then(addMovies)
        .catch(e => requestError(e, 'search error'));

    function addMovies(data){
        console.log(data);
        let htmlContent = '';
        let element = false;
       
       for(let i =0; i< data.results.length; i++){
        let title = data.results[i].title;

        let liTitle = document.createElement('li');
        liTitle.insertAdjacentText('afterbegin', `${title}`); 

        liTitle.onclick = function(){
            let img = document.createElement('img');
            img.src = data.results[i].poster_path;

            let h2 = document.createElement('h2');
            h2.insertAdjacentText('afterbegin', `${data.results[i].title}`); 

             let p = document.createElement('p');
             p.insertAdjacentText('afterbegin', `${data.results[i].overview}`); 

             responseContainer.insertAdjacentElement('afterbegin', img);
             responseContainer.insertAdjacentElement('afterbegin', h2);
             responseContainer.insertAdjacentElement('afterbegin', p);
        }

        if(!element){
            responseContainer.insertAdjacentElement('afterbegin', liTitle);
        }
     
       }

    }

       function requestError(e) {
        console.log(e);
        responseContainer.insertAdjacentHTML('beforeend', `<p class="network-warning">Oh no! There was an error making a request for the ${e}.</p>`);
    }
   
}

