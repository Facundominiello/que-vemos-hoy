let apiKey = 'ca28289a';
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
    let url = `http://www.omdbapi.com/?t=${pelicula}&apikey=${apiKey}`;

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
buscarRandom.addEventListener('click', () => {
  let anio = filtroAnio.value;
  let genero = filtroGenero.value;
  //let contenido = filtroContenido.value;
  let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${genero}&y=${anio}&type=movie`;

  fetch(url)
    .then(Response => Response.json())
    .then(data => {
      let peliculasSeries = data.Search;

      if (peliculasSeries) {
        let radomContenido = selectRandomContenido(peliculasSeries);
        resultadoRadom.innerHTML = `
        <div class="info">
            <img src=${radomContenido.Poster} class="poster">
            <div>
                <h2>${radomContenido.Title}</h2>
                <div class="calificacion">
                    <img src="flama.svg">
                    <h4>${radomContenido.imdbRating}</h4>
                </div>
                <div class="datos">
                    <span>${radomContenido.Rated}</span>
                    <span>${radomContenido.Year}</span>
                    <span>${radomContenido.Runtime}</span>
                </div>
                <div class="genero">
                    <div>${radomContenido.Genre.split(",").join("</div><div>")}</div>
                </div>
            </div>
        </div>
        <h3>Sinopsis:</h3>
        <p>${radomContenido.Plot}</p>
        <h3>Elenco:</h3>
        <p>${radomContenido.Actors}</p>
    `;
      } else {
        resultadoRadom.innerHTML = `<h3 class="mensaje">No encontramos nada con estos filtros</h3>`;
      }
    })
    .catch(error => {
      return'Hubo un problema', error;
    });
});

function selectRandomContenido(peliculasSeries) {
  let randomIndex = Math.floor(Math.random() * peliculasSeries.length);
  return peliculasSeries[randomIndex];
}

