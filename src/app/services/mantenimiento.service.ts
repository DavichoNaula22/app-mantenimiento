import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {
  private mantenimientos = [
    { id: 1, nombre: 'Cambio de aceite', descripcion: 'Cambio de aceite del motor', fecha: '2025-03-10' },
    { id: 2, nombre: 'Revisión de frenos', descripcion: 'Inspección y ajuste de frenos', fecha: '2025-03-15' }
  ];

  constructor() { }

  obtenerMantenimientos() {
    return this.mantenimientos;
  }

  agregarMantenimiento(mantenimiento: any) {
    mantenimiento.id = this.mantenimientos.length + 1;
    this.mantenimientos.push(mantenimiento);
  }

  eliminarMantenimiento(id: number) {
    this.mantenimientos = this.mantenimientos.filter(m => m.id !== id);
  }

  actualizarMantenimiento(mantenimientoActualizado: any) {
    const index = this.mantenimientos.findIndex(m => m.id === mantenimientoActualizado.id);
    if (index !== -1) {
      this.mantenimientos[index] = mantenimientoActualizado;
    }
  }
}
