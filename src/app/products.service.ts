import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }

  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';

  getProducts():Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}products`)
  }

  getProductDetails(id:string | null):Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}products/${id}`)
  }

  getCategories():Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}categories`)
  }

  getCategory(id:string | null):Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}categories/${id}`)
  }

  getSubcategories(id:string | null):Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}categories/${id}/subcategories`)
  }

  getBrands():Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}brands`)
  }
}
