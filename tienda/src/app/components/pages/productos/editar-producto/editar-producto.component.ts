import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ProductosService,
  Producto,
} from '../../../../services/productos/productos.service';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css',
})
export class EditarProductoComponent implements OnInit {
  private productosService = inject(ProductosService);
  productos: Producto[] = [];
  productoSeleccionadoId: number | null = null;
  previewUrl: string | null = null;

  productoForm = new FormGroup({
    nombre: new FormControl<string>('', { nonNullable: true }),
    descripcion: new FormControl<string | null>(null),
    precio: new FormControl<number | null>(null),
    stock: new FormControl<number | null>(null),
    imagen: new FormControl<File | null>(null),
    categoria: new FormControl<string | null>(null),
  });

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productosService.getProductos().subscribe({
      next: (data) => (this.productos = data),
      error: (err) => console.error('Error al cargar productos', err),
    });
  }

  seleccionarProducto(p: Producto): void {
    this.productoSeleccionadoId = p.id ?? null;
    this.previewUrl = p.imagen
      ? `http://localhost:3000/files/${p.imagen}`
      : null;

    this.productoForm.patchValue({
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: Number(p.precio),
      stock: p.stock,
      imagen: null,
      categoria: p.categoria,
    });
  }

  actualizarProducto(): void {
    if (this.productoSeleccionadoId === null) return;

    const formData = new FormData();
    const datos = this.productoForm.getRawValue();

    formData.append('nombre', datos.nombre);
    if (datos.descripcion) formData.append('descripcion', datos.descripcion);
    if (datos.precio !== null) formData.append('precio', String(datos.precio));
    if (datos.stock !== null) formData.append('stock', String(datos.stock));
    if (datos.categoria) formData.append('categoria', datos.categoria);
    if (datos.imagen instanceof File) formData.append('imagen', datos.imagen);

    this.productosService
      .updateProducto(this.productoSeleccionadoId, formData)
      .subscribe({
        next: () => {
          this.productoForm.reset();
          this.productoSeleccionadoId = null;
          this.previewUrl = null;
          this.cargarProductos();
        },
        error: (err) => console.error('Error al actualizar producto', err),
      });
  }

  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.productosService.deleteProducto(id).subscribe({
        next: () => this.cargarProductos(),
        error: (err) => console.error('Error al eliminar producto', err),
      });
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.productoForm.patchValue({ imagen: file });

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
