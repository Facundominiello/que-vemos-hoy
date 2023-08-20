let apiKey = '272527bf';
//RANDOM(VARIABLES)//
let buscarRandom = document.querySelector('.buscar-random');
let filtroGenero = document.querySelector('.filtro-genero');
let filtroAnio = document.querySelector('#filtro-anio');
let resultadoRadom = document.getElementById('resultado-random')
let random = document.querySelector('.random');
//let filtroContenido = document.querySelector('.filtro-contenido');
let contenedorRandom = document.querySelector('.contenedor-random');
//BUSCADOR(VARIABLES)//
let buscador = document.querySelector('.buscador');
let contenedorBuscador = document.querySelector('.contenedor-buscador');
let buscarBuscador = document.querySelector('.buscar-buscador');
let nombreDePelicula = document.getElementById('nombre-de-pelicula')
let resultadoBuscar = document.getElementById('resultado-buscar')


//BUSCADOR//
buscador.addEventListener('click', () => {
    contenedorBuscador.style.display = 'block'; 
    contenedorRandom.style.display = 'none';
  });
  
random.addEventListener('click', () => {
    contenedorBuscador.style.display = 'none';
    contenedorRandom.style.display = 'block';
  });

let getPelicula = () => {
    let pelicula = nombreDePelicula.value;
    let url = `https://www.omdbapi.com/?t=${pelicula}&apikey=${apiKey}`;

    if (pelicula.length <= 0) {
        resultadoBuscar.innerHTML = `<h3 class="mensaje">Ingrese el Titulo de la película en ingles...</h3>`;
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
            } else {
                resultadoBuscar.innerHTML = `<h3 class="mensaje">No encontramos la película, recuerda que debe ser en ingles el titulo</h3>`;
            }
          })
            .catch(() => {
                resultadoBuscar.innerHTML = `<h3 class="mensaje">Error</h3>`;
            });
    }
};

buscarBuscador.addEventListener("click", getPelicula);


//RANDOM(EN PROCESO)//
buscarRandom.addEventListener('click', async () => {
  try {
    const anio = filtroAnio.value;
    const genero = filtroGenero.value;
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${genero}&y=${anio}&type=movie&_=${Math.random()}`;

    const response = await fetch(url);
    const data = await response.json();

    const peliculasSeries = data.Search;

    if (peliculasSeries) {
      const randomContenido = selectRandomContenido(peliculasSeries);
      resultadoRadom.innerHTML = `
        <div class="info">
          <img src=${randomContenido.Poster} class="poster">
          <div>
              <h2>${randomContenido.Title}</h2>
              <div class="calificacion">
                  <img src="flama.svg">
                  <h4>${randomContenido.imdbRating}</h4>
              </div>
              <div class="datos">
                  <span>${randomContenido.Rated}</span>
                  <span>${randomContenido.Year}</span>
                  <span>${randomContenido.Runtime}</span>
              </div>
              <div class="genero">
                  <div>${randomContenido.Genre ? randomContenido.Genre.split(",").join("</div><div>") : ''}</div>
              </div>
          </div>
        </div>
        <h3>Sinopsis:</h3>
        <p>${randomContenido.Plot}</p>
        <h3>Elenco:</h3>
        <p>${randomContenido.Actors}</p>
      `;
    } else {
      resultadoRadom.innerHTML = `<h3 class="mensaje">No encontramos nada con estos filtros</h3>`;
    }
  } catch (error) {
    console.error('Hubo un problema:', error);
  }
});

function selectRandomContenido(peliculasSeries) {
  const randomIndex = Math.floor(Math.random() * peliculasSeries.length);
  return peliculasSeries[randomIndex];
}

