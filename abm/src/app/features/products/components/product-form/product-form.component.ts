import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../../shared/models/product.models';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnChanges {
  @Input() product: Product | null = null;
  @Output() save = new EventEmitter<Omit<Product, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.01)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });

    // Validación reactiva con RxJS
    this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe(values => {
        if (values.price > 1000) {
          console.warn('⚠ Precio muy alto');
        }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.form.patchValue(this.product);
    } else {
      this.form.reset({ name: '', price: 0, stock: 0 });
    }
  }

  submitForm() {
    if (this.form.invalid) {
      alert('Datos inválidos');
      return;
    }
    this.save.emit(this.form.value);
    this.form.reset({ name: '', price: 0, stock: 0 });
  }
}
