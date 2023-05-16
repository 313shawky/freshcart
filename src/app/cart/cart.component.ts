import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Cartdetails } from '../cartdetails';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _CartService: CartService, 
    private _ToastrService:ToastrService, 
    private _NgxSpinnerService:NgxSpinnerService) { }

  cartDetails:any;

  ngOnInit(): void {
    this._NgxSpinnerService.show();
    this._CartService.getLoggedUserCart().subscribe({
      next: (response) => {
        this._NgxSpinnerService.hide();
        this.cartDetails = response.data;
      }
    })
  }

  removeItem(productId:string) {
    this._CartService.removeCartItem(productId).subscribe({
      next: (response) => {
        this.cartDetails = response.data;
        this._CartService.numberOfCartItems.next(response.numOfCartItems)
        this.showSuccess();
      },
      error: (err) => {
      }
    })
  }

  updateItemCount(productId:string, count:number) {
    this._CartService.updateItemCount(productId, count).subscribe({
      next: (response) => {
        this.cartDetails = response.data;
      },
      error: (err) => {
      }
    })
  }

  showSuccess() {
    this._ToastrService.success('Item Removed Successfully.')
  }

}
