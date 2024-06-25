import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../model/Alumno';
import { TableModule } from 'primeng/table'; // Importa TableModule desde PrimeNG
import { AlumnoService } from '../../service/alumno.service';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [TableModule], // Importa TableModule desde PrimeNG
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {
  titulo: string = 'Lista de Alumnos';
  losAlumnos: Alumno[] = [];

  constructor(private alumnoService: AlumnoService) { }

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
}
