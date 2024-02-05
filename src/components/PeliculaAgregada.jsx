import { Accordion, Button, Card } from "react-bootstrap";

const PeliculaAgregada = ({ numeroPeliculaProps, borrarPeliculaProps }) => {
  return (
    <Card style={{ width: "15rem" }} className="mx-3 mb-3">
      <Card.Body>
        <Card.Title>{numeroPeliculaProps.titulo}</Card.Title>
        <Card.Text>{numeroPeliculaProps.genero}</Card.Text>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Descripción</Accordion.Header>
            <Accordion.Body>{numeroPeliculaProps.descripcion}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Button
          variant="danger"
          className="mt-3"
          onClick={() => borrarPeliculaProps(numeroPeliculaProps.idPelicula)}
        >
          Eliminar de la lista
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PeliculaAgregada;
