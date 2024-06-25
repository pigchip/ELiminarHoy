import { Component } from '@angular/core';
import { Alumno } from '../../model/Alumno';
import { AlumnoService } from '../../service/alumno.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-alumnos-form',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, InputNumberModule, ConfirmDialogModule],
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AlumnosFormComponent {
  alumno: Alumno = new Alumno();

  constructor(
    private alumnoService: AlumnoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  confirm() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas enviar estos datos?',
      header: 'Confirmación de Envío',
      accept: () => {
        this.enviarAlumno();
      }
    });
  }

  enviarAlumno() {
    this.alumnoService.createAlumno(this.alumno).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Alumno guardado correctamente' });
        console.log('Alumno guardado correctamente:', response);
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al guardar alumno' });
        console.error('Error al guardar alumno:', error);
      }
    );
  }
}
