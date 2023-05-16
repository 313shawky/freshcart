import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _AuthService: AuthService, private _CartService:CartService) { }

  isLogin: boolean = false;
  cartNumbers:number = 0;

  ngOnInit(): void {
    this._CartService.numberOfCartItems.subscribe({
      next: (value) => {
        this.cartNumbers = value
      }
    })
    this._AuthService.userData.subscribe({
      next: () => {
        if (this._AuthService.userData.getValue() !== null) {
          this.isLogin = true;
        }
        else {
          this.isLogin = false;
        }
      }
    })
  }

  signout(){
    this._AuthService.signout();
  }

}
