import { RouterModule, Routes } from '@angular/router';
import { CrearAdminLocalComponent } from './crear-admin-local/crear-admin-local.component';
import { ReadAdminLocalComponent } from './read-admin-local/read-admin-local.component';
import { UpdateAdminLocalComponent } from './update-admin-local/update-admin-local.component';
import { DeleteAdminLocalComponent } from './delete-admin-local/delete-admin-local.component';
import { InterfazPrincipalComponent } from './interfaz-principal/interfaz-principal.component';
import { LucesComponent } from './luces/luces.component';
import { AlarmaComponent } from './alarma/alarma.component';
import { LoginComponent } from './login/login.component';
import { CRUDAdminGlobalComponent } from './crud-admin-global/crud-admin-global.component';
import { BarraAdminLocalComponent } from './barra-admin-local/barra-admin-local.component';
import { InvitadoCrearComponent } from './invitado-crear/invitado-crear.component';
import { InvitadoBuscarComponent } from './invitado-buscar/invitado-buscar.component';
import { InvitadoActualizarComponent } from './invitado-actualizar/invitado-actualizar.component';
import { compileClassDebugInfo } from '@angular/compiler';
import { Component, NgModule } from '@angular/core';
import { InvitadoEliminarComponent } from './invitado-eliminar/invitado-eliminar.component';
import { Modo1Component } from './modo1/modo1.component';
import { Modo2Component } from './modo2/modo2.component';
import { AdjustTimeComponent } from './adjust-time/adjust-time.component';
import { PuertasComponent } from './puertas/puertas.component';
import { InterfazInvitadoComponent } from './interfaz-invitado/interfaz-invitado.component';



export const routes: Routes = [

  { path: 'crear-admin-local', component: CrearAdminLocalComponent },
  { path: 'read-admin-local', component: ReadAdminLocalComponent },
  { path: 'update-admin-local', component: UpdateAdminLocalComponent },
  { path: 'delete-admin-local/:cedula', component: DeleteAdminLocalComponent },
  {path: 'barra-admin-local', component:BarraAdminLocalComponent} ,
  { path: 'interfaz-principal', component: InterfazPrincipalComponent },
  { path: 'luces', component: LucesComponent },
  { path: 'alarma', component: AlarmaComponent },
  { path:'login',component:LoginComponent},
  { path:'',component:LoginComponent},
  {path :'Admin-Global',component:CRUDAdminGlobalComponent},
  {path :'Admin-Global',component:CRUDAdminGlobalComponent},
  {path: 'invitado-crear',component:InvitadoCrearComponent},
  {path: 'invitado-buscar',component:InvitadoBuscarComponent},
  {path: 'invitado-actualizar',component: InvitadoActualizarComponent},
  {path: 'invitado-eliminar/:cedula',component: InvitadoEliminarComponent},
  {path: 'modo1',component: Modo1Component},
  {path: 'modo2',component: Modo2Component},
  {path: 'adjust-time',component: AdjustTimeComponent},
  {path: 'puertas',component:PuertasComponent},
  {path: 'interfaz-invitado',component:InterfazInvitadoComponent} 
];




