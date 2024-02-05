import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ListaPeliculas from "./ListaPeliculas";

const FormularioPeliculas = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [genero, setGenero] = useState("");
  const peliculasLocalStorage =
    JSON.parse(localStorage.getItem("keyPeliculas")) || [];
  const [peliculasCargadas, setPeliculasCargadas] = useState(
    peliculasLocalStorage
  );

  useEffect(() => {
    localStorage.setItem("keyPeliculas", JSON.stringify(peliculasCargadas));
  }, [peliculasCargadas]);

  function handleSubmit(e) {
    let idPelicula = crypto.randomUUID();
    setPeliculasCargadas([
      ...peliculasCargadas,
      { titulo, descripcion, genero, idPelicula },
    ]);
  }
  function borrarPelicula(idUnica) {
    const peliculasFiltradas = peliculasCargadas.filter(
      (pelicula) => pelicula.idPelicula !== idUnica
    );
    setPeliculasCargadas(peliculasFiltradas);
  }
  return (
    <>
      <div className="container border my-4">
        <h1 className="text-center">Administrador de películas</h1>
        <Form className="px-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTituloPelicula">
            <Form.Label>Título de la película</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introducir el título completo"
              minLength={3}
              maxLength={50}
              onChange={(e) => setTitulo(e.target.value)}
              value={titulo}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGenero">
            <Form.Label>Género</Form.Label>
            <Form.Select
              aria-label="select"
              onChange={(e) => setGenero(e.target.value)}
              required
            >
              <option>Seleccionar género</option>
              <option value="Accion">Acción</option>
              <option value="Drama">Drama</option>
              <option value="Comedia">Comedia</option>
              <option value="Infantil">Infantil</option>
              <option value="Animada">Animada</option>
              <option value="Romance">Romance</option>
              <option value="Terror">Terror</option>
              <option value="Documental">Documental</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescripcion">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introducir una breve descripción sobre la película"
              minLength={10}
              maxLength={80}
              onChange={(e) => setDescripcion(e.target.value)}
              value={descripcion}
              required
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="my-3">
            Agregar película
          </Button>
        </Form>
      </div>
      <ListaPeliculas
        peliculasCargadasProps={peliculasCargadas}
        borrarPeliculaProps={borrarPelicula}
      ></ListaPeliculas>
    </>
  );
};

export default FormularioPeliculas;
