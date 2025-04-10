import { Component, inject, OnInit } from '@angular/core';
import {
  ProductosService,
  Producto,
} from '../../../../services/productos/productos.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.css',
})
export class CrearProductoComponent implements OnInit {
  private productosService = inject(ProductosService);
  previewUrl: string | null = null;
  productos: Producto[] = [];
  errorMessage: string | null = null;

  producto = new FormGroup({
    nombre: new FormControl<string>('', { nonNullable: true }),
    descripcion: new FormControl<string | null>(null),
    precio: new FormControl<number | null>(null),
    stock: new FormControl<number | null>(null),
    imagen: new FormControl<File | null>(null),
    categoria: new FormControl<string | null>(null),
  });

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.errorMessage = 'No se pudieron cargar los productos.';
      },
    });
  }

  createProducto(): void {
    const formData = new FormData();
    const producto = this.producto.getRawValue();

    formData.append('nombre', producto.nombre);
    if (producto.descripcion)
      formData.append('descripcion', producto.descripcion);
    if (producto.precio !== null)
      formData.append('precio', String(producto.precio));
    if (producto.stock !== null)
      formData.append('stock', String(producto.stock));
    if (producto.categoria) formData.append('categoria', producto.categoria);
    if (producto.imagen instanceof File)
      formData.append('imagen', producto.imagen);

    this.productosService.crearProducto(formData).subscribe({
      next: (response) => {
        console.log('Producto creado:', response);
        this.producto.reset(); // Limpia el formulario
        this.previewUrl = null;
        this.getProductos(); // Recarga la lista
      },
      error: (error) => {
        console.error('Error al crear producto:', error);
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.producto.patchValue({ imagen: file });

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
