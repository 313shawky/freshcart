import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private _CartService: CartService) { }

  cartId:string = '';

  ngOnInit(): void {
    this._CartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartId = res.data._id
      }
    })
  }

  shippingAddress: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null)
  })

  handleSubmit(shippingAddress: FormGroup) {
    this._CartService.payOnline(shippingAddress.value, this.cartId).subscribe({
      next: (response) => {
        this.navigateToPage(response.session.url)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  navigateToPage(url: string) {
    window.location.href = url;
  }
}
