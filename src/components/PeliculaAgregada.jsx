import { Accordion, Button, Card } from "react-bootstrap";

const PeliculaAgregada = ({ citaClienteProps, borrarCitaProps }) => {
  return (
    <Card style={{ width: "15rem" }} className="mx-3 mb-3">
      <Card.Body>
        <Card.Title>Título de la película</Card.Title>
        <Card.Text>Género</Card.Text>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Descripción</Accordion.Header>
            <Accordion.Body>Breve descripción acerca de la película en cuestión</Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Button
          variant="danger"
          className="mt-3"
          onClick={() => borrarCitaProps(citaClienteProps.idCita)}
        >
          Eliminar de la lista
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PeliculaAgregada;
