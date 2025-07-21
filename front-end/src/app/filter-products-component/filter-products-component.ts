import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-products-component',
  imports: [],
  templateUrl: './filter-products-component.html',
  styleUrl: './filter-products-component.css'
})
export class FilterProductsComponent {

  isFilterMenuOpen = false;

  toggleFilterMenu(){
    console.log("Menu ouvert : ");
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }

  applyFilters(){

    console.log("Application des filtres produtis...");
  }
}
