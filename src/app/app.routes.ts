import { Routes } from '@angular/router';
import { CrearAdminLocalComponent } from './crear-admin-local/crear-admin-local.component';
import { ReadAdminLocalComponent } from './read-admin-local/read-admin-local.component';
import { UpdateAdminLocalComponent } from './update-admin-local/update-admin-local.component';
import { DeleteAdminLocalComponent } from './delete-admin-local/delete-admin-local.component';
import { InterfazPrincipalComponent } from './interfaz-principal/interfaz-principal.component';
import { LucesComponent } from './luces/luces.component';
import { AlarmaComponent } from './alarma/alarma.component';

export const routes: Routes = [
{ path: '', redirectTo: '/crear', pathMatch: 'full' },
  { path: 'crear-admin-local', component: CrearAdminLocalComponent },
  { path: 'read-admin-local', component: ReadAdminLocalComponent },
  { path: 'update-admin-local', component: UpdateAdminLocalComponent },
  { path: 'delete-admin-local', component: DeleteAdminLocalComponent },
   
  { path: 'interfaz-principal', component: InterfazPrincipalComponent },
  { path: 'luces', component: LucesComponent },
  { path: 'alarma', component: AlarmaComponent }


];


