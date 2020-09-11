import {Component, ViewChild} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {RequestService} from './request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('inputIngredient') inputIngredients;

  types: any[] = [
    {id: 'ALL', name: 'Cualquiera'},
    {id: 'VEGAN', name: 'Vegano'},
    {id: 'VEGETARIAN', name: 'Vegetariano'}
  ];
  difficulty: any[] = [
    {id: 1, name: 'Facil'},
    {id: 2, name: 'Medio'},
    {id: 3, name: 'Dificil'}
  ];

  arrayIngredients: any[] = [];

  // User form
  public botFrom: FormGroup = this.formBuilder.group(
    {
      type: ['', Validators.required],
      name: ['', Validators.required],
      difficulty: ['', Validators.required],
      time: [null, Validators.required],
      glutenFree: [false],
      ingredients: [null, Validators.required],
      steps: [''],
      userName: ['']
    },
    {
      updateOn: 'change'
    }
  );

  constructor(private formBuilder: FormBuilder, private requestService: RequestService) {}

  addIngredient(): void {
    const value = this.inputIngredients.nativeElement.value;
    if (value) {
      this.arrayIngredients.unshift(value);
      this.botFrom.get('ingredients').setValue(this.arrayIngredients);
    }
    return (this.inputIngredients.nativeElement.value = null);
  }

  deleteItem(i: number): void {
    this.arrayIngredients.splice(i, 1);
  }

  editItem(i: number): void {
    if (!this.inputIngredients.nativeElement.value) {
      this.inputIngredients.nativeElement.value = this.arrayIngredients[i];
      this.deleteItem(i);
    }
  }

  sendForm(): void {
    const receta = this.botFrom.value;

    if (!receta.type.includes('ALL')) {
      receta.type.push('ALL');
    }

    this.requestService.saveForm(receta).subscribe(
      res => {
        this.botFrom.reset();
        this.arrayIngredients = [];
      },
      err => {
        console.error('Ocurrio un Error');
      }
    );
  }
}
