import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Brand } from '../brand';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{

  constructor(private _ProductsService:ProductsService) {}

  brands:Brand [] = [];

  ngOnInit(): void {
    this._ProductsService.getBrands().subscribe({
      next: (response) => this.brands = response.data
    })
  }

}
