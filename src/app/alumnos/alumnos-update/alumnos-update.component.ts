import { Component, OnInit } from '@angular/core';
import { AlumnoService } from '../../service/alumno.service';
import { Alumno } from '../../model/Alumno';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-alumnos-update',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule
  ],
  templateUrl: './alumnos-update.component.html',
  styleUrls: ['./alumnos-update.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AlumnosUpdateComponent implements OnInit {
  alumno: Alumno = new Alumno();
  alumnoId: number = 0;
  displayDialog: boolean = false;
  dialogMessages: string[] = [];
  dialogSeverity: string = '';

  constructor(
    private alumnoService: AlumnoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  cargarDatosAlumno() {
    this.alumnoService.getAlumno(this.alumnoId).subscribe(
      response => {
        this.alumno = response;
      },
      (error: HttpErrorResponse) => {
        this.dialogMessages = ['Error al cargar datos del alumno'];
        if (error.status === 404) {
          this.dialogMessages.push('Alumno no encontrado');
        }
        this.dialogSeverity = 'error';
        this.displayDialog = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.dialogMessages.join(', ')
        });
        console.error('Error al cargar datos del alumno:', error);
      }
    );
  }

  confirm() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas actualizar estos datos?',
      header: 'Confirmación de Actualización',
      accept: () => {
        this.actualizarAlumno();
      }
    });
  }

  actualizarAlumno() {
    this.alumnoService.updateAlumno(this.alumno.id, this.alumno).subscribe(
      response => {
        this.dialogMessages = ['Alumno actualizado correctamente'];
        this.dialogSeverity = 'success';
        this.displayDialog = true;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Alumno actualizado correctamente'
        });
        console.log('Alumno actualizado correctamente:', response);
      },
      (error: HttpErrorResponse) => {
        this.dialogMessages = ['Error al actualizar alumno'];
        if (error.status === 400 && error.error.errors) {
          this.dialogMessages = error.error.errors.map((err: { field: string, message: string }) => `${err.field}: ${err.message}`);
        }
        this.dialogSeverity = 'error';
        this.displayDialog = true;
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: this.dialogMessages.join(', ')
        });
        console.error('Error al actualizar alumno:', error);
      }
    );
  }

  hideDialog() {
    this.displayDialog = false;
  }
}
