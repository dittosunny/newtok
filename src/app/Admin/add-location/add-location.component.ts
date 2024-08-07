import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-add-location',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-location.component.html',
  styleUrl: './add-location.component.scss'
})
export class AddLocationComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private locationService: LocationService) {
    this.form = this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('Form submitted:', formData);

      this.locationService.sendData(formData).subscribe(
        response => {
          console.log('Data successfully sent to backend:', response);
        },
        error => {
          console.error('Error sending data to backend:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
