import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import ListaCistas from "./ListaCistas";

const FormularioCliente = () => {
  const [nombreMascota, setNombreMascota] = useState("");
  const [nombreDuenio, setNombreDuenio] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [detalles, setDetalles] = useState("");
  const citasLocalStorage = JSON.parse(localStorage.getItem("keyCitas")) || [];
  const [citasAgendadas, setCitasAgendadas] = useState(citasLocalStorage);

  useEffect(() => {
    localStorage.setItem("keyCitas", JSON.stringify(citasAgendadas));
  }, [citasAgendadas]);

  //expresiones regulares
  const expRegNombreDuenio = /^[a-zA-Zá-úÁ-ÚüÜñÑ\s']+$/;
  const expRegNombreMascota = /^[a-zA-Zá-úÁ-ÚüÜñÑ\s']+$/;
  const expRegFecha =
    /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{10}$/;
  const expRegHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  function handleSubmit(e) {
    if (
      expRegNombreDuenio.test(nombreDuenio) &&
      expRegNombreMascota.test(nombreMascota) &&
      expRegHora.test(hora)
    ) {
      e.preventDefault();
      let idCita = crypto.randomUUID();
      setCitasAgendadas([
        ...citasAgendadas,
        { nombreMascota, nombreDuenio, fecha, hora, detalles, idCita },
      ]);
    } else {
      alert("Por favor, verifique los datos introducidos");
    }
  }
  function borrarCita(idUnica) {
    const citasFiltradas = citasAgendadas.filter(
      (cita) => cita.idCita !== idUnica
    );
    setCitasAgendadas(citasFiltradas);
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
              onChange={(e) => setNombreMascota(e.target.value)}
              value={nombreMascota}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGenero">
            <Form.Label>Género</Form.Label>
            <Form.Select aria-label="select">
              <option>Seleccionar género</option>
              <option value="1">Acción</option>
              <option value="2">Drama</option>
              <option value="3">Comedio</option>
              <option value="4">Infantil</option>
              <option value="5">Animada</option>
              <option value="6">Romance</option>
              <option value="7">Terror</option>
              <option value="8">Documental</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescripcion">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introducir una breve descripción sobre la película"
              minLength={10}
              maxLength={80}
              onChange={(e) => setNombreDuenio(e.target.value)}
              value={nombreDuenio}
              required
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit" className="my-3">
            Agendar turno
          </Button>
        </Form>
      </div>
      <ListaCistas
        citasAgendadasProps={citasAgendadas}
        borrarCitaProps={borrarCita}
      ></ListaCistas>
    </>
  );
};

export default FormularioCliente;
