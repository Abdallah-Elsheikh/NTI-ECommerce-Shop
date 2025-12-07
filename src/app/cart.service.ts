import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  private cartItems: any[] = [];
  
  private cart = new BehaviorSubject<any[]>([]);
  
  
  cart$ = this.cart.asObservable();

  constructor() { }

  
  addToCart(product: Product) {
    
    const existingProduct = this.cartItems.find(item => item.id === product.id);

    if (existingProduct) {
      
      existingProduct.quantity += 1;
    } else {
      
      this.cartItems.push({ ...product, quantity: 1 });
    }
    
    this.cart.next(this.cartItems);
  }

  
  increaseQuantity(productId: number) {
    const product = this.cartItems.find(item => item.id === productId);
    if (product) {
      product.quantity += 1;
      this.cart.next(this.cartItems);
    }
  }

 
  decreaseQuantity(productId: number) {
    const product = this.cartItems.find(item => item.id === productId);
    if (product && product.quantity > 1) {
      product.quantity -= 1;
      this.cart.next(this.cartItems);
    } else if (product && product.quantity === 1) {
      
      this.removeFromCart(productId);
    }
  }

  
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.cart.next(this.cartItems);
  }

  
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
