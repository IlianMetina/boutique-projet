import { Component, inject } from '@angular/core';
import { FilterService } from '../services/filter/filter-service';

@Component({
  selector: 'app-filter-products-component',
  imports: [],
  templateUrl: './filter-products-component.html',
  styleUrl: './filter-products-component.css'
})
export class FilterProductsComponent {

  filterService = inject(FilterService);

  isFilterMenuOpen = false;

  toggleFilterMenu(){
    console.log("Menu ouvert : ");
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }

  applyFilters(){

    console.log("Application des filtres produits...");
  }
}
