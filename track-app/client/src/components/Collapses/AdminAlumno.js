import { Collapse, Button} from 'reactstrap';
import React, { Component } from 'react';
import DualListAlumno from "../KeyPad/DualListAlumno"

class AdminAlumno extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {

    this.setState(state => ({ collapse: !state.collapse }));
  }


  render() {

    return (
      <div>
        <Button color="primary" size="slg" block onClick={this.toggle}><h5>Alumnos</h5></Button>
        <Collapse isOpen={this.state.collapse}>
      <DualListAlumno {...this.props} onCollapse={()=> this.toggle()}/>
      
        </Collapse>
      </div>
    );
  }
}

export default AdminAlumno;
