import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MantenimientosComponent } from './features/mantenimientos/mantenimientos.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MantenimientosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
}
