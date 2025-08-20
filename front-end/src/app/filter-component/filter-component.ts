import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-component',
  imports: [],
  templateUrl: './filter-component.html',
  styleUrl: './filter-component.css'
})
export class FilterComponent {
  
  filterChange(event: Event){

    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    if(selectedValue == 'asc'){

      this.ascendingFilter();
    }else if(selectedValue == 'desc'){

      this.descendingFilter();
    }else{
      return;
    }

  }

  ascendingFilter(){
    
    console.log("Vous avez choisi la méthode de tri par prix croissant")
  }
  
  descendingFilter(){
  
    console.log("Vous avez choisi la méthode de tri par prix décroissant")
  }

}
