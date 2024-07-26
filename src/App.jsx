import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [items, setItems] = useState([]);
  const [nuevoItemId, setNuevoItemId] = useState('');
  const [nuevoItemTitulo, setNuevoItemTitulo] = useState('');
  const [nuevoItemGenero, setNuevoItemGenero] = useState('');
  const [nuevoItemTipo, setNuevoItemTipo] = useState('');
  const [editandoItem, setEditandoItem] = useState(null);
  const [mensaje, setMensaje] = useState('');

  const handleNuevoItemId = (e) => setNuevoItemId(e.target.value);
  const handleNuevoItemTitulo = (e) => setNuevoItemTitulo(e.target.value);
  const handleNuevoItemGenero = (e) => setNuevoItemGenero(e.target.value);
  const handleNuevoItemTipo = (e) => setNuevoItemTipo(e.target.value);

  const handleAgregarItem = () => {
    const nuevoItem = {
      clave1: parseInt(nuevoItemId),
      clave2: nuevoItemTitulo,
      clave3: nuevoItemGenero,
      clave4: nuevoItemTipo
    };

    // Validación para que la clave no se repita
    if (items.some(item => item.clave1 === nuevoItem.clave1)) {
      setMensaje('Error: La clave (ID) ya existe');
      return;
    }

    setItems(prev => {
      const nuevoArreglo = [...prev, nuevoItem];
      localStorage.setItem("items", JSON.stringify(nuevoArreglo));
      setMensaje('Item agregado exitosamente');
      return nuevoArreglo;
    });

    setNuevoItemId('');
    setNuevoItemTitulo('');
    setNuevoItemGenero('');
    setNuevoItemTipo('');
  };

  const handleEliminarItem = (idItem) => {
    setItems(prev => {
      const resultadosEliminados = prev.filter(objeto => objeto.clave1 !== idItem);
      localStorage.setItem("items", JSON.stringify(resultadosEliminados));
      setMensaje('Item eliminado exitosamente');
      return resultadosEliminados;
    });
  };

  const handleEditarItem = (item) => {
    setEditandoItem(item);
    setNuevoItemId(item.clave1);
    setNuevoItemTitulo(item.clave2);
    setNuevoItemGenero(item.clave3);
    setNuevoItemTipo(item.clave4);
  };

  const handleGuardarEdicion = () => {
    // Validación para que la clave no se repita (excepto para el propio elemento que se está editando)
    if (items.some(item => item.clave1 === parseInt(nuevoItemId) && item.clave1 !== editandoItem.clave1)) {
      setMensaje('Error: La clave (ID) ya existe');
      return;
    }

    setItems(prev => {
      const itemsActualizados = prev.map(i =>
        i.clave1 === editandoItem.clave1 ? { ...i, clave1: parseInt(nuevoItemId), clave2: nuevoItemTitulo, clave3: nuevoItemGenero, clave4: nuevoItemTipo } : i
      );
      localStorage.setItem("items", JSON.stringify(itemsActualizados));
      setMensaje('Item editado exitosamente');
      return itemsActualizados;
    });

    setEditandoItem(null);
    setNuevoItemId('');
    setNuevoItemTitulo('');
    setNuevoItemGenero('');
    setNuevoItemTipo('');
  };

  const handleCancelarEdicion = () => {
    setEditandoItem(null);
    setNuevoItemId('');
    setNuevoItemTitulo('');
    setNuevoItemGenero('');
    setNuevoItemTipo('');
  };

  useEffect(() => {
    const itemsAlmacenados = JSON.parse(localStorage.getItem("items") || "[]");
    setItems(itemsAlmacenados);
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4" style={{ color: '#007BFF' }}>Gestión de Películas y Series</h1>
          <form onSubmit={(e) => e.preventDefault()} className="bg-light p-4 rounded shadow-sm">
            <div className="mb-3">
              <label htmlFor="id_item" className="form-label">ID</label>
              <input
                type="number"
                value={nuevoItemId}
                onChange={handleNuevoItemId}
                className="form-control"
                id="id_item"
                placeholder="Ingrese el ID"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="titulo_item" className="form-label">Título</label>
              <input
                type="text"
                value={nuevoItemTitulo}
                onChange={handleNuevoItemTitulo}
                className="form-control"
                id="titulo_item"
                placeholder="Ingrese el título"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="genero_item" className="form-label">Género</label>
              <input
                type="text"
                value={nuevoItemGenero}
                onChange={handleNuevoItemGenero}
                className="form-control"
                id="genero_item"
                placeholder="Ingrese el género"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tipo_item" className="form-label">Tipo</label>
              <input
                type="text"
                value={nuevoItemTipo}
                onChange={handleNuevoItemTipo}
                className="form-control"
                id="tipo_item"
                placeholder="Ingrese el tipo"
              />
            </div>
            {editandoItem ? (
              <>
                <button type="button" className="btn btn-primary me-2" onClick={handleGuardarEdicion}>Guardar Cambios</button>
                <button type="button" className="btn btn-secondary" onClick={handleCancelarEdicion}>Cancelar</button>
              </>
            ) : (
              <button type="button" className="btn btn-success" onClick={handleAgregarItem}>Añadir</button>
            )}
          </form>
          {mensaje && <div className="alert alert-info mt-3 text-center">{mensaje}</div>}
          <hr className="my-4"/>
          <h3 className="text-center" style={{ color: '#007BFF' }}>Lista de Películas y Series</h3>
          <ul className="lista-grupo">
            {items.map((item) => (
              <li key={item.clave1} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>ID:</strong> {item.clave1}, <strong>Título:</strong> {item.clave2}, <strong>Género:</strong> {item.clave3}, <strong>Tipo:</strong> {item.clave4}
                </div>
                <div className="d-flex">
                  <button type="button" className="btn btn-warning btn-sm me-2" onClick={() => handleEditarItem(item)}>Editar</button>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => handleEliminarItem(item.clave1)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
