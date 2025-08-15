
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../shared/models/user.models';

@Component({
  selector: 'app-user-form',
  standalone: true, // ✅ Necesario si usas imports
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'] // ✅ Plural y array
})
export class UserFormComponent implements OnChanges {
  @Input() user: User | null = null;
  @Output() save = new EventEmitter<Omit<User, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  roles: User['role'][] = ['admin', 'user'];
  form: FormGroup;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

   
    this.form.valueChanges.subscribe(values => {
      if (values.email && !values.email.includes('@')) {
        console.warn('⚠ Email inválido');
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.form.patchValue(this.user);
    } else {
      this.form.reset({ name: '', role: '', email: '' });
    }
  }

  submitForm() {
    if (this.form.invalid) {
      alert('Datos inválidos');
      return;
    }
    this.save.emit(this.form.value);
    this.form.reset({ name: '', role: '', email: '' });
  }
}
