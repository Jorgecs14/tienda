import { Routes } from '@angular/router';
import { ProductosComponent } from './components/pages/productos/productos.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { RegistroComponent } from './components/pages/registro/registro.component';
import { CrearProductoComponent } from './components/pages/productos/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './components/pages/productos/editar-producto/editar-producto.component';
import { VerProductoComponent } from './components/pages/productos/ver-producto/ver-producto.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  { path: 'productos', title: 'productos 💸', component: ProductosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'productos/crear-producto', component: CrearProductoComponent },
  { path: 'productos/editar-producto', component: EditarProductoComponent },
  { path: 'productos/ver-producto', component: VerProductoComponent },
  { path: 'not-found', title: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
];
