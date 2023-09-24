let apiKey = '272527bf';
let titulo = document.querySelector('titulo')
//RANDOM(VARIABLES)//
let buscarRandom = document.querySelector('.buscar-random');
let resultadoRadom = document.getElementById('resultado-random')
let random = document.querySelector('.random');
let contenedorRandom = document.querySelector('.contenedor-random');
let buscando = document.getElementById('buscando')
//BUSCADOR(VARIABLES)//
let buscador = document.querySelector('.buscador');
let contenedorBuscador = document.querySelector('.contenedor-buscador');
let buscarBuscador = document.querySelector('.buscar-buscador');
let nombreDePelicula = document.getElementById('nombre-de-pelicula')
let resultadoBuscar = document.getElementById('resultado-buscar')
const spinner = document.querySelector('.sk-chase')

//BUSCADOR//
buscador.addEventListener('click', () => {
    contenedorBuscador.style.display = 'block'; 
    contenedorRandom.style.display = 'none';
  });
  
random.addEventListener('click', () => {
    contenedorBuscador.style.display = 'none';
    contenedorRandom.style.display = 'block';
  });

buscador.addEventListener('click', () => {
  contenedorBuscador.style.display = 'block'; 
  contenedorRandom.style.display = 'none';
  limpiarResultados();
});

random.addEventListener('click', () => {
  contenedorBuscador.style.display = 'none';
  contenedorRandom.style.display = 'block';
  limpiarResultados(); 
});

function limpiarResultados() {
  resultadoBuscar.innerHTML = ''; 
  resultadoRadom.innerHTML = ''; 
}

let timer;

nombreDePelicula.addEventListener('input', () => {
  clearTimeout(timer);

  timer = setTimeout(() => {
    getPeliculaAutoComplete();
  }, 500);
});

async function getPeliculaAutoComplete() {
  let pelicula = nombreDePelicula.value;
  let url = `https://www.omdbapi.com/?s=${pelicula}&apikey=${apiKey}`;

  if (pelicula.length <= 0) {
    iziToast.warning({
      title: 'Precaución',
      message: 'Ingrese el Titulo de la película en ingles...',
      position: 'topRight'
    })  } else {
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response == "True") {
        const sugerenciasLimitadas = data.Search.slice(0, 3);
        const sugerencias = sugerenciasLimitadas.map(item => {
          return `
            <li class="itemSugerencia">
              <img class="posterSugerencia" src="${item.Poster}" alt="${item.Title}" /> ${item.Title}
            </li>
          `;
        }).join('');

        resultadoBuscar.innerHTML = `
          <ul class="sugerencia">${sugerencias}</ul>
        `;

        const sugerenciaItems = resultadoBuscar.querySelectorAll('li');
        sugerenciaItems.forEach(item => {
          item.addEventListener('click', () => {
            nombreDePelicula.value = item.textContent;
            resultadoBuscar.innerHTML = '';
            getPelicula();
          });
        });
      } 
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Hubo un error.',
        position: 'topRight'
      });
    }
  }
}

let getPelicula = () => {
    let pelicula = nombreDePelicula.value;
    let url = `https://www.omdbapi.com/?t=${pelicula}&apikey=${apiKey}`;

    if (pelicula.length <= 0) {
        iziToast.warning({
          title: 'Precaución',
          message: 'Ingrese el Titulo de la película en ingles...',
          position: 'topRight'
        })
    } else {
        fetch(url)
          .then(resp => resp.json())
          .then(data => {
            if (data.Response == "True") {
                resultadoBuscar.innerHTML = `
                    <div class="info">
                    <img src=${data.Poster} class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="calificacion">
                            <img src="flama.svg">
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="datos">
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtime}</span>
                        </div>
                        <div class="genero">
                            <div>${data.Genre.split(",").join("</div><div>")}</div>
                        </div>
                    </div>
                </div>
                <h3>Sinopsis:</h3>
                <p>${data.Plot}</p>
                <h3>Elenco:</h3>
                <p>${data.Actors}</p>
                `;
                iziToast.success({
                  title: 'Éxito',
                  message: 'Disfruta tu película',
                  position: 'topRight',
                });
                if (window.innerWidth <= 768) { 
                  contenedorMobile.style.height = '100%';
                }
            } else {
              iziToast.error({
                title: 'Error',
                message: 'No se encontró la película. Recuerda que debe ser en inglés el título.',
                position: 'topRight'
            });
        }
      })
        .catch(() => {
            iziToast.error({
                title: 'Error',
                message: 'Hubo un error.',
                position: 'topRight'
            });
        });
    }
};

buscarBuscador.addEventListener("click", getPelicula);


//RANDOM(EN PROCESO)//
buscarRandom.addEventListener('click', async () => {
  try {
    spinner.style.display = 'inline-block';
    buscarRandom.style.backgroundColor = '#dacd5a';
    buscarRandom.style.cursor = 'auto';
    buscando.style.display = 'none';
    let numeroRandom;
    let data;

    if (spinner.style.display = 'inline-block') {
      iziToast.warning({
        title: 'Precaución',
        message: 'Este proceso puede demorar',
        position: 'topRight'
      })
    }
    do {
      numeroRandom = Math.floor(Math.random() * 9999999) + 1;
      const url = `https://www.omdbapi.com/?i=tt${numeroRandom}&apikey=${apiKey}`;
      const response = await fetch(url);
      data = await response.json();
    } while (data.Response !== "True" || data.imdbRating === "N/A" || data.Poster === "N/A" && (data.Type === "movie" || data.Type === "series"));

    resultadoRadom.innerHTML = `
      <div class="info">
        <img src=${data.Poster} class="poster">
        <div>
          <h2>${data.Title}</h2>
          <div class="calificacion">
            <img src="flama.svg">
            <h4>${data.imdbRating}</h4>
          </div>
          <div class="datos">
            <span>${data.Rated}</span>
            <span>${data.Year}</span>
            <span>${data.Runtime}</span>
          </div>
          <div class="genero">
            <div>${data.Genre ? data.Genre.split(",").join("</div><div>") : ''}</div>
          </div>
        </div>
      </div>
      <h3>Sinopsis:</h3>
      <p>${data.Plot}</p>
      <h3>Elenco:</h3>
      <p>${data.Actors}</p>
    `;

    spinner.style.display = 'none';
    buscarRandom.style.display = 'inline-block';
    buscarRandom.style.cursor = 'pointer';
    buscarRandom.style.removeProperty('background-color');
    buscando.style.display = 'inline-block';
    
  } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Hubo un error.',
        position: 'topRight'
      });
  }
});