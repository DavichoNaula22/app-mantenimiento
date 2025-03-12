import { Injectable } from '@angular/core';

// Decorador que indica que esta clase puede ser inyectada como una dependencia
@Injectable({
  // Define que este servicio debe ser provisto en la raíz de la aplicación
  providedIn: 'root'
})
// Clase del servicio MantenimientoService
export class MantenimientoService {
  // Arreglo privado que almacena la lista de mantenimientos
  private mantenimientos = [
    // Datos de ejemplo para los mantenimientos
    { id: 1, nombre: 'Cambio de aceite', descripcion: 'Cambio de aceite del motor', fecha: '2025-03-10', imagen: null },
    { id: 2, nombre: 'Revisión de frenos', descripcion: 'Inspección y ajuste de frenos', fecha: '2025-03-15', imagen: null }
  ];

  // Constructor del servicio (actualmente vacío)
  constructor() { }

  // Método para obtener la lista completa de mantenimientos
  obtenerMantenimientos() {
    // Retorna la lista de mantenimientos
    return this.mantenimientos;
  }

  // Método para agregar un nuevo mantenimiento a la lista
  agregarMantenimiento(mantenimiento: any) {
    // Asigna un nuevo ID al mantenimiento basado en la longitud actual de la lista + 1
    mantenimiento.id = this.mantenimientos.length + 1;
    // Inicializa la propiedad imagen como null
    mantenimiento.imagen = null; // Inicialmente sin imagen
    // Agrega el nuevo mantenimiento al arreglo
    this.mantenimientos.push(mantenimiento);
  }

  // Método para eliminar un mantenimiento de la lista, buscando por ID
  eliminarMantenimiento(id: number) {
    // Filtra la lista de mantenimientos, excluyendo el elemento con el ID proporcionado
    this.mantenimientos = this.mantenimientos.filter(m => m.id !== id);
  }

  // Método para actualizar la información de un mantenimiento existente
  actualizarMantenimiento(mantenimientoActualizado: any) {
    // Encuentra el índice del mantenimiento a actualizar, basándose en el ID
    const index = this.mantenimientos.findIndex(m => m.id === mantenimientoActualizado.id);
    // Verifica si el mantenimiento fue encontrado (índice no es -1)
    if (index !== -1) {
      // Reemplaza el elemento en la lista con el mantenimiento actualizado
      this.mantenimientos[index] = mantenimientoActualizado;
    }
  }
}
