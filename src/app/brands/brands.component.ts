import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Brand } from '../brand';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{

  constructor(private _ProductsService:ProductsService, 
    private _NgxSpinnerService:NgxSpinnerService) {}

  brands:Brand [] = [];

  ngOnInit(): void {
    this._NgxSpinnerService.show();
    this._ProductsService.getBrands().subscribe({
      next: (response) => {
        this._NgxSpinnerService.hide();
        this.brands = response.data;
      }
    })
  }

}
