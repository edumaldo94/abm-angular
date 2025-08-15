import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { User } from '../../../../shared/models/user.models';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-form',
  imports: [],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnChanges {
  @Input() user: User | null = null;
  @Output() save = new EventEmitter<Omit<User, 'id'>>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup | undefined;
constructor(private fb: FormBuilder){
  this.form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['',Validators.required],
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
      this.form?.patchValue(this.user);
    } else {
      this.form?.reset({ firstName: '', lastName: '', email: '' });
    }
  }
  submitForm() {
    if (this.form?.invalid) {
      alert('Datos inválidos');
      return;
    }
    this.save.emit(this.form?.value);
    this.form?.reset({ firstName: '', lastName: '', email: '' });
  }

}

