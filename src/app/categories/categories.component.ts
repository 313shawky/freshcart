import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Category } from '../category';
import { Subcategory } from '../subcategory';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private _ProductsService:ProductsService, private _ActivatedRoute:ActivatedRoute) { }

  categories:Category[] = [];
  categoryId: string | null = '';
  category:Category = {
    _id:'',
    name:'',
    image:''
  };
  subcategories:Subcategory[] = [];

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.categoryId = params.get('id')
    })

    this._ProductsService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data
      }
    })

    this._ProductsService.getCategory(this.categoryId).subscribe({
      next: (response) => {
        this.category = response.data
      }
    })

    this._ProductsService.getSubcategories(this.categoryId).subscribe({
      next: (response) => {
        this.subcategories = response.data
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
