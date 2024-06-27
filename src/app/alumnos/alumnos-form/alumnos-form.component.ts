import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-alumnos-form',
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
  templateUrl: './alumnos-form.component.html',
  styleUrls: ['./alumnos-form.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AlumnosFormComponent implements OnInit {
  alumno: Alumno = new Alumno();
  alumnoId: number | null = null;
  displayDialog: boolean = false;
  dialogMessages: string[] = [];
  dialogSeverity: string = '';

  constructor(
    private route: ActivatedRoute,
    private alumnoService: AlumnoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.alumnoId = +id;
        this.cargarDatosAlumno();
      }
    });
  }

  cargarDatosAlumno() {
    if (this.alumnoId) {
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
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este alumno?',
      header: 'Confirmación de Eliminación',
      accept: () => {
        this.eliminarAlumno();
      }
    });
  }

  eliminarAlumno() {
    if (this.alumnoId) {
      this.alumnoService.deleteAlumno(this.alumnoId).subscribe(
        () => {
          this.dialogMessages = ['Alumno eliminado correctamente'];
          this.dialogSeverity = 'success';
          this.displayDialog = true;
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Alumno eliminado correctamente'
          });
          this.alumno = new Alumno();  // Clear form
          this.alumnoId = null;  // Reset ID
          console.log('Alumno eliminado correctamente');
        },
        (error: HttpErrorResponse) => {
          this.dialogMessages = ['Error al eliminar alumno'];
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
          console.error('Error al eliminar alumno:', error);
        }
      );
    }
  }

  confirmSave() {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas guardar estos datos?',
      header: 'Confirmación de Guardado',
      accept: () => {
        this.guardarAlumno();
      }
    });
  }

  guardarAlumno() {
    if (!this.alumno.id || this.alumno.id === 0) {
      this.alumnoService.createAlumno(this.alumno).subscribe(
        response => {
          this.dialogMessages = ['Alumno creado correctamente'];
          this.dialogSeverity = 'success';
          this.displayDialog = true;
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Alumno creado correctamente'
          });
          console.log('Alumno creado correctamente:', response);
        },
        (error: HttpErrorResponse) => {
          this.dialogMessages = ['Error al crear alumno'];
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
          console.error('Error al crear alumno:', error);
        }
      );
    } else {
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
  }

  hideDialog() {
    this.displayDialog = false;
  }
}
