import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../model/Alumno';
import { TableModule } from 'primeng/table';
import { AlumnoService } from '../../service/alumno.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, FormsModule, ConfirmDialogModule, ToastModule],
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AlumnosComponent implements OnInit {
  titulo: string = 'Lista de Alumnos';
  losAlumnos: Alumno[] = [];

  constructor(
    private alumnoService: AlumnoService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getAlumnos();
  }

  getAlumnos() {
    this.alumnoService.getAlumnos().subscribe(
      (data: Alumno[]) => {
        this.losAlumnos = data;
      },
      (error) => {
        console.error('Error al obtener los alumnos:', error);
      }
    );
  }

  editarAlumno(id: number) {
    this.router.navigate(['/alumnosForm', id]);
  }

  confirmDelete(id: number) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de que deseas eliminar este alumno?',
      header: 'Confirmación de Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarAlumno(id);
      }
    });
  }

  eliminarAlumno(id: number) {
    this.alumnoService.deleteAlumno(id).subscribe(
      () => {
        this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Alumno eliminado correctamente'});
        this.getAlumnos(); // Refresca la lista de alumnos después de eliminar
      },
      (error: HttpErrorResponse) => {
        this.messageService.add({severity:'error', summary: 'Error', detail: 'Error al eliminar el alumno'});
        console.error('Error al eliminar alumno:', error);
      }
    );
  }
}
