import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Product } from '../product.interface';
import { CartService } from '../cart.service'; 

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
} )
export class ProductDetailsComponent implements OnInit {
  product: Product | undefined;
  selectedImage: string | undefined;

  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cartService: CartService 
   ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.http.get<Product>(`https://dummyjson.com/products/${productId}` ).subscribe(data => {
        this.product = data;
        this.selectedImage = data.images[0];
      });
    }
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }

  getStarRating(rating: number): number[] {
    const fullStars = Math.floor(rating);
    return Array(fullStars).fill(0);
  }

  
  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.title} has been added to the cart!`);
  }
}
