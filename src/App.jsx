import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import FiltroBusqueda from './Components/FiltroBusquedad'; 

const data = [
  { id: 1, nombre: "Juan Carlos Pastas Valencia", descripcion: "Estudiante de Desarrollo Software" },
  { id: 2, nombre: "Jose Daniel Peralta Arango", descripcion: "Estudiante de Analisis de Datos" },
  { id: 3, nombre: "Daniel Chavez Bravo", descripcion: "Profesor en el Area de tecnologia" },
  { id: 4, nombre: "Isabella Contreras Bechara", descripcion: "Funcionario Sena" },
  { id: 5, nombre: "Elian Felipe Ome Rojas", descripcion: "Coordinador CTPI" },
  { id: 6, nombre: "Luisa Morcillo Parra", descripcion: "Usuario Administrativo" }
];

class App extends React.Component {
  state = {
    data: data,
    form: {
      id: '',
      nombre: '',
      descripcion: '' 
    },
    
    modalInsertar: false,
    modalEditar: false, // Agregamos modalEditar al estado inicial
    filtro: '' // Agregamos estado para filtro de búsqueda
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };

  // Creación de los modales

  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  }

  ocultarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  }

  mostrarModalEditar = (registro) => {
    this.setState({ modalEditar: true, form: registro });
  }

  ocultarModalEditar = () => {
    this.setState({ modalEditar: false });
  }

  // Cierre de la creación de modales

  // Estado que va a tener la aplicación

  insertar = () => {
    let valorNuevo = { ...this.state.form };
    valorNuevo.id = this.state.data.length + 1;
    let lista = this.state.data;
    lista.push(valorNuevo);
    this.setState({ data: lista, modalInsertar: false });
  }

  actualizar = () => {
    
    // Aquí va la lógica para actualizar los datos en el estado
    this.setState({ modalEditar: false });
  }

  editar = (dato) => {
    let contador=0;
    let lista= this.state.data;
    lista.map((registro)=>{
      if(dato.id==registro.id){
        lista[contador].nombre=dato.nombre;
        lista[contador].descripcion=dato.descripcion;
      }
      contador++;  
    });
    this.setState({data:lista, modalEditar:false});
  }

  eliminar=(dato)=>{
    let opcion=window.confirm("Realmente quieres eliminar el registro "+ dato.id);
    if(opcion){
      let contador=0 
      let lista=this.state.data;
      lista.map((registro)=>{
        if(registro.id==dato.id){
          lista.splice(contador, 1);
        }
        contador++;  
      });
      this.setState({data:lista});
    }
  }
  
  // Método para filtrar usuarios
  filtrarUsuarios = (e) => {
    this.setState({ filtro: e.target.value });
  }

  render() {
    const { filtro, data } = this.state;
    const usuariosFiltrados = data.filter(usuario =>
      usuario.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
      <>
        <Container style={{ marginTop: '20px' }}> {/* Margen superior añadido */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Boton Añadir */}
            <Button color='success' onClick={this.mostrarModalInsertar}>Añadir</Button>

            {/* Componente FiltroBusqueda */}
            <FiltroBusqueda filtro={filtro} onFiltrarUsuarios={this.filtrarUsuarios} />
          </div>
          <br />

          {/* Tabla Principal */}
          <Table>
            {/* Esta es la parte superior de la tabla */}
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Acciones</th>
              </tr>
            </thead>

            {/* Esta es la parte del cuerpo de la tabla. Donde cada usuario tiene su informacion y los 
            botones de editar y eliminar. */}
            <tbody>
              {usuariosFiltrados.map((elemento) => (
                <tr key={elemento.id}>
                  {/* Cada td es el campo que tiene cada usuario id, nombre, descripcion */}
                  <td>{elemento.id}</td>
                  <td>{elemento.nombre}</td>
                  <td>{elemento.descripcion}</td>
                  {/* Estos son los botones Editar y eliminar */}
                  <td>
                    <Button color="primary" onClick={() => this.mostrarModalEditar(elemento)}>Editar</Button>{" "}
                    <Button color="danger" onClick={() => this.eliminar(elemento)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {/* MODAL PARA INSERTAR DATOS */}
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div>
              <h3>Insertar Registro</h3>
            </div>
          </ModalHeader>

          {/* ModalBody */}
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className='form-control' readOnly type='text' value={this.state.data.length + 1} />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input className='form-control' name='nombre' type='text' onChange={this.handleChange} />
            </FormGroup>

            <FormGroup>
              <label>Descripción:</label>
              <input className='form-control' name='descripcion' type='text' onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>

          {/* ModalFooter */}
          <ModalFooter>
            <Button color='primary' onClick={this.insertar}>Insertar</Button>
            <Button color='danger' onClick={this.ocultarModalInsertar}>Cancelar</Button>
          </ModalFooter>
        </Modal>

        {/* MODAL PARA EDITAR */}
        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>

          {/* ModalBody */}
          <ModalBody>
            <FormGroup>
              <label>Id:</label>
              <input className='form-control' readOnly type='text' value={this.state.form.id} />
            </FormGroup>

            <FormGroup>
              <label>Nombre:</label>
              <input className='form-control' name='nombre' type='text' onChange={this.handleChange} value={this.state.form.nombre} />
            </FormGroup>

            <FormGroup>
              <label>Descripción:</label>
              <input className='form-control' name='descripcion' type='text' onChange={this.handleChange} value={this.state.form.descripcion} />
            </FormGroup>
          </ModalBody>

          {/* ModalFooter */}
          <ModalFooter>
            <Button color='primary' onClick={() => this.editar(this.state.form)}>Editar</Button>
            <Button color='danger' onClick={this.ocultarModalEditar}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
