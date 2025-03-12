// Suggested code may be subject to a license. Learn more: ~LicenseLog:3111596459.
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MantenimientoService } from '../../services/mantenimiento.service'; // Importa el servicio de mantenimiento
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-mantenimientos', // Selector del componente
  standalone: true, // Indica que el componente es independiente
  templateUrl: './mantenimientos.component.html',
  imports: [CommonModule, FormsModule], // Importa los módulos necesarios
  
  styleUrl: './mantenimientos.component.css' // Ruta a los estilos CSS
})
export class MantenimientosComponent {
  mantenimientos: any[] = []; // Array para almacenar los mantenimientos
  nuevoMantenimiento = { nombre: '', descripcion: '', fecha: '' }; // Objeto para almacenar los datos del nuevo mantenimiento
  mantenimientoEnEdicion: any = null; // Objeto para almacenar el mantenimiento en edición (Para edición)

  constructor(private mantenimientoService: MantenimientoService) {
    // inyecta el servicio de MantenimientoService
  }

  ngOnInit() {
    this.mantenimientos = this.mantenimientoService.obtenerMantenimientos(); // Obtiene los mantenimientos del servicio
  }

  agregar() {
    // Verifica si todos los campos están completos
    if (this.nuevoMantenimiento.nombre && this.nuevoMantenimiento.descripcion && this.nuevoMantenimiento.fecha) {
      this.mantenimientoService.agregarMantenimiento({ ...this.nuevoMantenimiento }); // Agrega el nuevo mantenimiento
      this.mantenimientos = this.mantenimientoService.obtenerMantenimientos(); // Actualiza la lista de mantenimientos
      this.nuevoMantenimiento = { nombre: '', descripcion: '', fecha: '' }; // Limpia el formulario
    }
  }

  eliminar(id: number) {
    this.mantenimientoService.eliminarMantenimiento(id); // Elimina el mantenimiento por id
    this.mantenimientos = this.mantenimientoService.obtenerMantenimientos(); // Actualiza la lista de mantenimientos
  }

  editar(mantenimiento: any) {
    this.mantenimientoEnEdicion = { ...mantenimiento }; // Carga el mantenimiento para editar
  }

  guardarEdicion() {
    // Verifica si hay un mantenimiento en edición
    if (this.mantenimientoEnEdicion) {
      this.mantenimientoService.actualizarMantenimiento(this.mantenimientoEnEdicion); // Actualiza el mantenimiento
      this.mantenimientos = this.mantenimientoService.obtenerMantenimientos(); // Actualiza la lista de mantenimientos
      this.mantenimientoEnEdicion = null; // Limpia el mantenimiento en edición
    }
  }

  cancelarEdicion() {
    this.mantenimientoEnEdicion = null; // Limpia el mantenimiento en edición
  }

  async tomarFoto(mantenimiento: any): Promise<void> {
    // Maneja la captura de la foto para el mantenimiento
    try {
      // Llama a la función getPhoto de la cámara
      const image = await Camera.getPhoto({
        quality: 90, // Calidad de la imagen
        allowEditing: false, // No permite editar la imagen
        resultType: CameraResultType.Base64 // Tipo de resultado (Base64)
      });
      // Construye la URL de la imagen en base64
      mantenimiento.imagen = `data:image/${image.format};base64,${image.base64String}`;
      // Actualizamos el mantenimiento en el servicio. Actualiza el mantenimiento que se le saca la foto
      this.mantenimientoService.actualizarMantenimiento(mantenimiento); // Actualiza el mantenimiento
      this.mantenimientos = this.mantenimientoService.obtenerMantenimientos(); // Actualiza la lista de mantenimientos
    } catch (error) {
      console.error("Error al capturar la foto:", error); // Imprime un error
    }
  }
}
