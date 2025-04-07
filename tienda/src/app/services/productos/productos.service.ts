import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: string;
  stock: number | null;
  imagen: string | null;
  categoria: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private http = inject(HttpClient);
  private apiUrl: string = 'http://localhost:3000/api/productos';

  getProductos(): Observable<Producto[]> {
    console.log('ProductosComponent initialized');
    return this.http.get<Producto[]>(this.apiUrl);
  }
}
