import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {
  public capturedImage: string | null = null;

  async tomarFoto(): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64  // Devuelve la imagen en formato Base64
      });
      this.capturedImage = `data:image/${image.format};base64,${image.base64String}`;
    } catch (error) {
      console.error('Error al tomar la foto:', error);
    }
  }
}
