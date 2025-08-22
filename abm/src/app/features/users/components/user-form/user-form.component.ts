import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { User } from '../../../../shared/models/user.models';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnChanges {
  @Input() user: User | null = null;
  @Output() save = new EventEmitter<Omit<User, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  roles: User['role'][] = ['admin', 'user'];
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      photo: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      role: ['', Validators.required],
      email: this.fb.control('', [Validators.required, Validators.email, this.emailFormatValidator()]),
      dni: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
      phone: ['', [Validators.pattern(/^\+?\d{7,15}$/)]],
      birthDate: ['', []], // luego se puede agregar validator personalizado
      address: this.fb.group({
        city: ['', Validators.required],
        country: ['', Validators.required],
      })
    });
  }

  // ✅ Getter para acceder a controles fácilmente en el HTML
  get f() {
    return this.form.controls as {
       photo: AbstractControl;
      name: AbstractControl;
      role: AbstractControl;
      email: AbstractControl;
      dni: AbstractControl;
      phone: AbstractControl;
      birthDate: AbstractControl;
      address: FormGroup<{
        city: AbstractControl;
        country: AbstractControl;
      }>;
    };
  }



  emailFormatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && !value.includes('@')) {
        return { emailFormat: true };
      }
      return null;
    };
  }

  ngOnChanges(changes: SimpleChanges) {
     if (changes['user'] && this.user) {
      this.form.patchValue({
        ...this.user,
        address: {
          city: this.user.city || '',
          country: this.user.country || ''
        },
        photo: this.user.photo || ''
      });
    } else {
      this.form.reset({
        name: '',
        role: '',
        email: '',
        dni: '',
        phone: '',
        birthDate: '',
        address: { city: '', country: '' }
      });
    }
  }
  // ✅ Función para cargar la imagen y mostrar preview
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.form.patchValue({ photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // ✅ muestra errores en todos los campos
      return;
    }

    const userData: Omit<User, 'id'> = {
      ...this.form.value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.save.emit(userData);
    this.form.reset();
  }
}
