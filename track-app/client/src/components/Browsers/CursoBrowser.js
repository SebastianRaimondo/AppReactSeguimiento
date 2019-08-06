import React from "react";
import { Table } from "reactstrap";
import { Button } from "reactstrap";
import api from "../Api/apiRar";
import CursoRow from "../Rows/CursoRow";

export default class CursoBrowser extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  delete(id) {
    api.deleteCurso(id, () =>
      api.getCursos().then(res => this.setState({ data: res.data }))
    );
  }

  add() {
    api.getCursos().then(res => this.setState({ data: res.data }));
  }

  componentDidMount() {
    api.getCursos().then(res => this.setState({ data: res.data }));
  }

  render() {
    const { data } = this.state;
    return (
      <Table>
        <thead>
          <div>
            <Button margin="left" color="primary">
              {" "}
              Crear un curso
            </Button>
          </div>

          <tr>
            <th>Materia</th>
            <th>Sede</th>
            <th>Dias</th>
            <th>Cuatrimestre</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>

        {data.map((curso, idx) => (
          <CursoRow
            key={idx}
            indice={idx}
            materia={curso.materia}
            sede={curso.sede}
            dias={curso.dias}
            cuatrimestre={curso.cuatrimestre}
            anio={curso.anio}
            id={curso._id}
            callbackFn={id => this.delete(id)}
            cbAdd={id => this.add()}
          />
        ))}
      </Table>
    );
  }
}