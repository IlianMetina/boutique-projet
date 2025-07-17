import { Component } from '@angular/core';
import { FilterProductsComponent } from '../filter-products-component/filter-products-component';

@Component({
  selector: 'app-tables-component',
  imports: [FilterProductsComponent],
  templateUrl: './tables-component.html',
  styleUrl: './tables-component.css'
})
export class TablesComponent {

}
