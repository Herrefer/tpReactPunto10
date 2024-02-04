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
  const expRegFecha = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{10}$/;
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
    }else{
      alert("Por favor, verifique los datos introducidos")
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
        <h1 className="text-center">Administrador de pacientes</h1>
        <Form className="px-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formNombreMascota">
            <Form.Label>Nombre de la mascota</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduzca el nombre de la mascota"
              minLength={3}
              maxLength={30}
              onChange={(e) => setNombreMascota(e.target.value)}
              value={nombreMascota}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNombreDueño">
            <Form.Label>Nombre completo del dueño</Form.Label>
            <Form.Control
              type="text"
              placeholder="Introduzca el nombre completo del dueño"
              minLength={10}
              maxLength={80}
              onChange={(e) => setNombreDuenio(e.target.value)}
              value={nombreDuenio}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formFecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              placeholder="dd/mm/aa"
              onChange={(e) => setFecha(e.target.value)}
              value={fecha}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formHora">
            <Form.Label>Hora (en formato 24 hs)</Form.Label>
            <Form.Control
              type="time"
              placeholder="hh:mm"
              minLength={5}
              maxLength={5}
              onChange={(e) => setHora(e.target.value)}
              value={hora}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSintomas">
            <Form.Label>Descripcion de síntomas</Form.Label>
            <Form.Control
              type="text"
              placeholder="Breve descripcion de los síntomas de la mascota"
              minLength={10}
              maxLength={500}
              onChange={(e) => setDetalles(e.target.value)}
              value={detalles}
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
