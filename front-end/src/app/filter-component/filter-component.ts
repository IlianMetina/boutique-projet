import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-component',
  imports: [],
  templateUrl: './filter-component.html',
  styleUrl: './filter-component.css'
})
export class FilterComponent {
  
  @Output() sortProductsUpdate = new EventEmitter<string>();

  filterChange(event: Event){

    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    if(selectedValue == 'asc'){

      this.ascendingFilter();
    }else if(selectedValue == 'desc'){

      this.descendingFilter();
    }else{
      this.defaultFilter();
    }
  }

  ascendingFilter(){
    
    console.log("Vous avez choisi la méthode de tri par prix croissant");
    this.sortProductsUpdate.emit('asc');
  }
  
  descendingFilter(){
  
    console.log("Vous avez choisi la méthode de tri par prix décroissant");
    this.sortProductsUpdate.emit('desc');
  }

  defaultFilter(){

    this.sortProductsUpdate.emit('default')
  }

}
