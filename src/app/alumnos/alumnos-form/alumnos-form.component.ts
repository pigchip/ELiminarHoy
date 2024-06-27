import { Component } from '@angular/core';
import { Alumno } from '../../model/Alumno';
import { AlumnoService } from '../../service/alumno.service';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-alumnos-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule
  ],
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AlumnosFormComponent {
  alumno: Alumno = new Alumno();
  displayDialog: boolean = false;
  dialogMessages: string[] = [];
  dialogSeverity: string = '';

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
        this.dialogMessages = ['Alumno guardado correctamente'];
        this.dialogSeverity = 'success';
        this.displayDialog = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Alumno guardado correctamente'
        });
        console.log('Alumno guardado correctamente:', response);
      },
      (error: HttpErrorResponse) => {
        if (error.status === 400 && error.error.errors) {
          this.dialogMessages = error.error.errors.map((err: { field: string, message: string }) => `${err.field}: ${err.message}`);
        } else {
          this.dialogMessages = ['Error al guardar alumno'];
        }
        this.dialogSeverity = 'error';
        this.displayDialog = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.dialogMessages.join(', ')
        });
        console.error('Error al guardar alumno:', error);
      }
    );
  }

  hideDialog() {
    this.displayDialog = false;
  }
}
