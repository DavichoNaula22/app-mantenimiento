import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MantenimientoService } from '../../services/mantenimiento.service';

@Component({
  selector: 'app-mantenimientos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mantenimientos.component.html',
  styleUrls: ['./mantenimientos.component.css']
})
export class MantenimientosComponent {
  mantenimientos: any[] = [];
  nuevoMantenimiento = { nombre: '', descripcion: '', fecha: '' };
  mantenimientoEnEdicion: any = null; // Guarda el mantenimiento que se está editando

  constructor(private mantenimientoService: MantenimientoService) {}

  ngOnInit() {
    this.mantenimientos = this.mantenimientoService.obtenerMantenimientos();
  }

  agregar() {
    if (this.nuevoMantenimiento.nombre && this.nuevoMantenimiento.descripcion && this.nuevoMantenimiento.fecha) {
      this.mantenimientoService.agregarMantenimiento({ ...this.nuevoMantenimiento });
      this.mantenimientos = this.mantenimientoService.obtenerMantenimientos();
      this.nuevoMantenimiento = { nombre: '', descripcion: '', fecha: '' }; // Reiniciar formulario
    }
  }

  eliminar(id: number) {
    this.mantenimientoService.eliminarMantenimiento(id);
    this.mantenimientos = this.mantenimientoService.obtenerMantenimientos();
  }

  editar(mantenimiento: any) {
    this.mantenimientoEnEdicion = { ...mantenimiento }; // Copia del mantenimiento para edición
  }

  guardarEdicion() {
    if (this.mantenimientoEnEdicion) {
      this.mantenimientoService.actualizarMantenimiento(this.mantenimientoEnEdicion);
      this.mantenimientos = this.mantenimientoService.obtenerMantenimientos();
      this.mantenimientoEnEdicion = null; // Cerrar el modo de edición
    }
  }

  cancelarEdicion() {
    this.mantenimientoEnEdicion = null;
  }
}
