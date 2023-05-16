import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Shippingaddress } from './shippingaddress';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';

  headers: any = {
    token: localStorage.getItem('userToken')
  }

  numberOfCartItems = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient) {
    this.getLoggedUserCart().subscribe({
      next: (response) => {
        this.numberOfCartItems.next(response.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addToCart(productId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}cart`,
      { productId: productId },
      { headers: this.headers }
    )
  }

  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}cart`,
    { headers: this.headers })
  }

  removeCartItem(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}cart/${productId}`,
    { headers: this.headers })
  }

  updateItemCount(productId: string, count: number): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}cart/${productId}`,
      { count: count },
      { headers: this.headers })
  }

  payOnline(shippingAddress: Shippingaddress, cartId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}orders/checkout-session/${cartId}?url=http://localhost:4200`,
      { shippingAddress: shippingAddress },
      { headers: this.headers })
  }
}
