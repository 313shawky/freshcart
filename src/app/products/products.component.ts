import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _ProductsService:ProductsService, 
    private _CartService:CartService, 
    private _ToastrService:ToastrService,
    private _NgxSpinnerService:NgxSpinnerService) {}

  products:Product [] = [];
  searchTerm:string = '';

  ngOnInit(): void {
    this._NgxSpinnerService.show();
    this._ProductsService.getProducts().subscribe({
      next: (response) => {
        this._NgxSpinnerService.hide();
        this.products = response.data
      }
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

  showSuccess() {
    this._ToastrService.success('Item Added Successfully.')
  }
}
