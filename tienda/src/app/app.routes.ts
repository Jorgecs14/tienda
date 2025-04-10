import { Routes } from '@angular/router';
import { ProductosComponent } from './components/pages/productos/productos.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegistroComponent } from './components/pages/registro/registro.component';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { CrearProductoComponent } from './components/pages/productos/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './components/pages/productos/editar-producto/editar-producto.component';
import { VerProductoComponent } from './components/pages/productos/ver-producto/ver-producto.component';
import { NotFoundComponent } from './components/pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/productos', pathMatch: 'full' },
  {
    path: 'productos',
    title: 'Productos 💸',
    component: ProductosComponent,
    // children: [
    //     {path: 'crear-producto', title: "Crear Producto", component: CrearProductoComponent},
    //     {path: 'editar-producto', title: "Editar Producto", component: EditarProductoComponent},
    //     {path: 'ver-producto', title: "Producto", component: VerProductoComponent},
    // ]
  },
  {
    path: 'productos/crear-producto',
    title: 'Crear Producto',
    component: CrearProductoComponent,
  },
  {
    path: 'productos/editar-producto',
    title: 'Editar Producto',
    component: EditarProductoComponent,
  },
  {
    path: 'productos/ver-producto',
    title: 'Producto',
    component: VerProductoComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' },
  { path: 'not-found', title: '404 Not Found', component: NotFoundComponent },
];
