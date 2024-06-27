import { Component } from '@angular/core';
import { AlumnoService } from '../../service/alumno.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-alumnos-delete',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumberModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    DialogModule
  ],
  templateUrl: './alumnos-delete.component.html',
  styleUrls: ['./alumnos-delete.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AlumnosDeleteComponent {
  alumnoId: number = 0;
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
      message: '¿Estás seguro de que deseas eliminar este alumno?',
      header: 'Confirmación de Eliminación',
      accept: () => {
        this.eliminarAlumno();
      }
    });
  }

  eliminarAlumno() {
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

  hideDialog() {
    this.displayDialog = false;
  }
}
