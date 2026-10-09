export class Producto {
  static items = [];

  constructor(codigo, nombre, precio, imagen) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }

  static agregar(producto) {
    Producto.items.push(producto);
    Producto.guardarEnLocalStorage();
  }

  static eliminar(codigo) {
    Producto.items = Producto.items.filter(item => item.codigo !== codigo);
    Producto.guardarEnLocalStorage();
  }

  static guardarEnLocalStorage() {
    localStorage.setItem('productos', JSON.stringify(Producto.items));
  }

  static cargarDeLocalStorage() {
    const datosGuardados = localStorage.getItem('productos');
    if (datosGuardados) {
      const arrayParseado = JSON.parse(datosGuardados);
      Producto.items = arrayParseado.map(
        p => new Producto(p.codigo, p.nombre, Number(p.precio), p.imagen)
      );
    }
  }
}