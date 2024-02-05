import PeliculaAgregada from "./PeliculaAgregada";

const ListaPeliculas = ({ citasAgendadasProps, borrarCitaProps }) => {
  return (
    <>
      <div className="container text-center">
        <h2>Películas subidas</h2>
      </div>
      <div className="container d-flex flex-row flex-wrap justify-content-center">
        {citasAgendadasProps.map((cita, posicionElemento) => (
          <PeliculaAgregada
            key={posicionElemento}
            citaClienteProps={cita}
            borrarCitaProps ={borrarCitaProps}
          ></PeliculaAgregada>
        ))}
      </div>
    </>
  );
};

export default ListaPeliculas;
