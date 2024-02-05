import PeliculaAgregada from "./PeliculaAgregada";

const ListaPeliculas = ({ peliculasCargadasProps, borrarPeliculaProps }) => {
  return (
    <>
      <div className="container text-center">
        <h2>Películas subidas</h2>
      </div>
      <div className="container d-flex flex-row flex-wrap justify-content-center">
        {peliculasCargadasProps.map((pelicula, posicionElemento) => (
          <PeliculaAgregada
            key={posicionElemento}
            numeroPeliculaProps={pelicula}
            borrarPeliculaProps ={borrarPeliculaProps}
          ></PeliculaAgregada>
        ))}
      </div>
    </>
  );
};

export default ListaPeliculas;
