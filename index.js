import { Producto } from './classes/Producto.js';

const formProducto = document.getElementById('form-producto');
const listaProductos = document.getElementById('lista-productos');

document.addEventListener('DOMContentLoaded', () => {
  Producto.cargarDeLocalStorage();
  renderizarTabla();
});

formProducto.addEventListener('submit', (e) => {
  e.preventDefault();

  const codigo = document.getElementById('codigo').value.trim();
  const nombre = document.getElementById('nombre').value.trim();
  const precio = parseFloat(document.getElementById('precio').value);
  const imagen = document.getElementById('imagen').value.trim();

  const yaExiste = Producto.items.some(p => p.codigo === codigo);
  if (yaExiste) {
    alert('Ya existe un producto con ese código.');
    return;
  }

  const nuevoProducto = new Producto(codigo, nombre, precio, imagen);
  Producto.agregar(nuevoProducto);

  formProducto.reset();
  renderizarTabla();
});

function renderizarTabla() {
  listaProductos.innerHTML = '';

  Producto.items.forEach((prod) => {
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td><img src="${prod.imagen}" alt="${prod.nombre}" onerror="this.src='https://via.placeholder.com/50'"></td>
      <td>${prod.codigo}</td>
      <td>${prod.nombre}</td>
      <td>$${prod.precio.toFixed(2)}</td>
      <td>
        <button class="btn-eliminar" data-codigo="${prod.codigo}">Eliminar</button>
      </td>
    `;

    const btnEliminar = fila.querySelector('.btn-eliminar');
    btnEliminar.addEventListener('click', () => {
      Producto.eliminar(prod.codigo);
      renderizarTabla();
    });

    listaProductos.appendChild(fila);
  });
}