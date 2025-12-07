import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
} )
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private http: HttpClient ) { }

  ngOnInit(): void {
    
    this.http.get<{ products: Product[] }>('https://dummyjson.com/products' ).subscribe(data => {
      this.products = data.products;
    });
  }
}
