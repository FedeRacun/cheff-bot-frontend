import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {RequestService} from './request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('inputIngredient') inputIngredients;

  loading: boolean;

  types: any[] = [
    {id: 'ALL', name: 'Cualquiera'},
    {id: 'VEGAN', name: 'Vegano'},
    {id: 'VEGETARIAN', name: 'Vegetariano'},
    {id: 'DESSERT', name: 'Postre'}
  ];
  difficulty: any[] = [
    {id: '1', name: 'Facil'},
    {id: '2', name: 'Medio'},
    {id: '3', name: 'Dificil'}
  ];

  arrayIngredients: any[] = [];

  // User form
  public botFrom: FormGroup = this.formBuilder.group(
    {
      type: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
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

  ngOnInit(): void {
    this.loading = false;
  }

  addIngredient(): void {
    let value = this.inputIngredients.nativeElement.value;
    value = value.trim();
    if (!!value) {
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

    if (!receta.type.includes('ALL') && !receta.type.includes('DESSERT')) {
      receta.type.push('ALL');
    }
    receta.name = receta.name.trim();
    this.loading = true;
    this.requestService.saveForm(receta).subscribe(
      res => {
        this.botFrom.reset();
        this.botFrom.get('glutenFree').setValue(false);
        this.botFrom.get('steps').setValue('');
        this.botFrom.get('userName').setValue('');
        this.arrayIngredients = [];
        this.showOk();
        this.loading = false;
      },
      err => {
        console.error('Ocurrio un Error');
        this.showFail();
        this.loading = false;
      }
    );
  }

  showOk(): void {
    Swal.fire(
      'Perfecto!',
      `Tu receta fue enviada satifactoriamente.
      Luego de revisarla, sera añadida junto con el resto.
      Gracias por colaborar!`,
      'success'
    );
  }

  showFail(): void {
    Swal.fire(
      'Disculpanos!',
      `Cometimos un error y no pudimos procesar tu receta,
       te pedimos disculpas y te garantizamos que alguien será despedido por esto. Muchas gracias`,
      'error'
    );
  }

  checkName(): any {
    let value = this.botFrom.get('name').value;
    value = value.trim();
    if (!value.length) {
      return this.botFrom.get('name').setValue('');
    }
  }
}
