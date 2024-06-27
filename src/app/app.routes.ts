import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlumnosComponent } from './alumnos/alumnos/alumnos.component';
import { AlumnosFormComponent } from './alumnos/alumnos-form/alumnos-form.component';
import { AlumnosDeleteComponent } from './alumnos/alumnos-delete/alumnos-delete.component';
import { AlumnosUpdateComponent } from './alumnos/alumnos-update/alumnos-update.component';

export const routes: Routes = [
    {
        path: '', 
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'alumnos',
        component: AlumnosComponent,
    },
    {
        path: 'alumnosForm',
        component: AlumnosFormComponent,
    },
    {
        path: 'alumnosForm/:id',
        component: AlumnosFormComponent,
    },
    {
        path: 'alumnosDelete',
        component: AlumnosDeleteComponent,
    },
    {
        path: 'alumnosUpdate',
        component: AlumnosUpdateComponent,
    }
];
