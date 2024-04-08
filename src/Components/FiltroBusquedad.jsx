import React from 'react';

class FiltroBusqueda extends React.Component {
  render() {
    return (
      <input
        type="text"
        placeholder="Buscar usuario..."
        value={this.props.filtro}
        onChange={this.props.onFiltrarUsuarios}
        style={{ marginLeft: '10px', width: '200px' }} // Estilos personalizados
      />
    );
  }
}

export default FiltroBusqueda;