import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { Category } from '../category';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _ProductsService: ProductsService, private _CartService:CartService) { }

  products: Product[] = [];
  categories: Category[] = [];

  ngOnInit(): void {
    this._ProductsService.getProducts().subscribe({
      next: (response) => this.products = response.data
    });

    this._ProductsService.getCategories().subscribe({
      next: (response) => this.categories = response.data
    })
  }

  addToCart(productId:string) {
    this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        this._CartService.numberOfCartItems.next(response.numOfCartItems)
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 7
      }
    },
    nav: true
  }

}
