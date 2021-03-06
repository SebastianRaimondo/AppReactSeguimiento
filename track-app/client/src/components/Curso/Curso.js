import React, { Component } from "react";
import AdminAlumno from "../Collapses/AdminAlumno";
import AdminProfesor from "../Collapses/AdminProfesor";
import { Container, Row, Col, Button } from "reactstrap";
import api from "../api/apiRar";
import AlertCurso from "../Alerts/AlertCurso/AlertCurso";
import AlertError from "../Alerts/AlertError";
import { Link } from "react-router-dom";
import AdminAsignaciones from "../Collapses/AdminAsignaciones";
//import AsigAlumProfBrowser from "../Browsers/AsigAlumProfBrowser";

class Curso extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      profParaElegir: [],
      alumParaElegir: [],
      asignaciones: [],

      dataAlu: [],
      dataProf: []
    };
  }

  componentDidMount() {
    api.getCurso(this.props.match.params.id).then(res => {
      this.setState({ data: res.data });
      api
        .getProfesores()
        .then(res => this.setState({ profParaElegir: res.data }));
      api
        .getAlumumnos()
        .then(res => this.setState({ alumParaElegir: res.data }));
    });
    api.getCursoCompleto(this.props.match.params.id).then(res =>
      this.setState({
        dataProf: res.data.profesores,
        dataAlu: res.data.alumnos
      })
    );
  }

  actualizarEstado() {
    api.getCurso(this.props.match.params.id).then(res => {
      this.setState({ data: res.data });
      api
        .getProfesores()
        .then(res => this.setState({ profParaElegir: res.data }));
      api
        .getAlumumnos()
        .then(res => this.setState({ alumParaElegir: res.data }));
    });
    api.getCursoCompleto(this.props.match.params.id).then(res =>
      this.setState({
        dataProf: res.data.profesores,
        dataAlu: res.data.alumnos
      })
    );
  }

  createNewStateWithAlum(alumnos) {
    let newState = {
      materia: this.state.data.materia,
      sede: this.state.data.sede,
      anio: this.state.data.anio,
      dias: this.state.data.dias,
      cuatrimestre: this.state.data.cuatrimestre,
      profesores: this.state.data.profesores,
      _id: this.state.data._id,
      alumnos: alumnos
    };

    return newState;
  }

  createNewStateWithProf(profesores) {
    let newState = {
      materia: this.state.data.materia,
      sede: this.state.data.sede,
      anio: this.state.data.anio,
      dias: this.state.data.dias,
      cuatrimestre: this.state.data.cuatrimestre,
      profesores: profesores,
      _id: this.state.data._id,
      alumnos: this.state.data.profesores
    };

    return newState;
  }

  updateStateWithAlum(alumnos) {
    this.setState({ data: this.createNewStateWithAlum(alumnos) });
    api.editCurso(
      this.state.data._id,
      {
        materia: this.state.data.materia,
        sede: this.state.data.sede,
        anio: this.state.data.anio,
        dias: this.state.data.dias,
        cuatrimestre: this.state.data.cuatrimestre,
        profesores: this.state.data.profesores,
        alumnos: alumnos
      },
      () => this.actualizarEstado()
    );
  }

  updateStateWithProf(profesores) {
    this.setState({ data: this.createNewStateWithProf(profesores) });
    api.editCurso(
      this.state.data._id,
      {
        materia: this.state.data.materia,
        sede: this.state.data.sede,
        anio: this.state.data.anio,
        dias: this.state.data.dias,
        cuatrimestre: this.state.data.cuatrimestre,
        profesores: profesores,
        alumnos: this.state.data.alumnos
      },
      () => this.actualizarEstado()
    );
  }

  render() {
    const { alumParaElegir } = this.state;
    const { profParaElegir } = this.state;
    const { data } = this.state;
    const { dataAlu } = this.state;
    const { dataProf } = this.state;
    console.log(dataAlu);
    if (
      profParaElegir.length > 0 &&
      alumParaElegir.length > 0 &&
      data !== undefined
    ) {
      return (
        <Container>
          <Row>
            <Col>
              <AlertCurso
                materia={data.materia}
                sede={data.sede}
                dias={data.dias}
                cuatrimestre={data.cuatrimestre}
                anio={data.anio}
              />
              <div className="card-header">
                <Link to={"/cursos"}>
                  {" "}
                  <Button color="primary" size="sm">
                    Ir a cursos
                  </Button>{" "}
                </Link>
              </div>
              <AdminAlumno
                cbFnAlu={alu => this.updateStateWithAlum(alu)}
                alumnos={alumParaElegir}
                aElegidos={data.alumnos}
              />

              <br></br>
              <AdminProfesor
                cbFnProf={prof => this.updateStateWithProf(prof)}
                profesores={profParaElegir}
                pElegidos={data.profesores}
              />
              <br></br>

              <AdminAsignaciones
                dataAlu={dataAlu}
                dataProf={dataProf}
                idCurso={data._id}
              />
            </Col>
          </Row>
        </Container>
      );
    } else return <AlertError />;
  }
}
export default Curso;
