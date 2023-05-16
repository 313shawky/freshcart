import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _ProductsService:ProductsService, private _CartService:CartService) {}

  products:Product [] = [];
  searchTerm:string = '';

  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data
      }
    })
  }

  addToCart(productId:string) {
    this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        this._CartService.numberOfCartItems.next(response.numOfCartItems)
      },
      error: (err) => {
      }
    })
  }
}
