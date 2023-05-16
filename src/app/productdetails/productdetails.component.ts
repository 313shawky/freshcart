import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../cart.service';
import { ToastrService } from 'ngx-toastr'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService:ToastrService,
    private _NgxSpinnerService: NgxSpinnerService) { }

  productId: string | null = '';
  productDetails: Product = {
    images: [],
    id: '',
    title: '',
    imageCover: '',
    description: '',
    quantity: 0,
    price: 0,
    category: {
      _id: '',
      name: '',
      image: ''
    },
    brand: {
      _id: '',
      name: '',
      image: ''
    },
    ratingsAverage: 0
  };

  ngOnInit(): void {
    this._NgxSpinnerService.show();

    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id')
    })

    this._ProductsService.getProductDetails(this.productId).subscribe({
      next: (response) => {
        this._NgxSpinnerService.hide();
        this.productDetails = response.data;
      }
    })
  }

  addToCart(productId: string) {
    this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        this._CartService.numberOfCartItems.next(response.numOfCartItems)
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
        items: 1
      }
    },
    nav: true
  }

  showSuccess() {
    this._ToastrService.success('Item Added Successfully.')
  }
}
