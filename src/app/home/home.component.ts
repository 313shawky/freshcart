import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { Category } from '../category';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _ProductsService: ProductsService, 
    private _CartService:CartService, 
    private _ToastrService:ToastrService,
    private _NgxSpinnerService:NgxSpinnerService) { }

  products: Product[] = [];
  categories: Category[] = [];

  ngOnInit(): void {
    this._NgxSpinnerService.show();
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this._NgxSpinnerService.hide();
        this.products = response.data
      }
    });

    this._ProductsService.getCategories().subscribe({
      next: (response) => this.categories = response.data
    })
  }

  addToCart(productId:string) {
    this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        this._CartService.numberOfCartItems.next(response.numOfCartItems);
        this.showSuccess();
      },
      error: (err) => {
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

  showSuccess() {
    this._ToastrService.success('Item Added Successfully.')
  }

}
