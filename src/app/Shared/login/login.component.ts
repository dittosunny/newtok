import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';  // Import Router



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  hide = true; // Property to toggle password visibility

  constructor(private fb: FormBuilder , private authService: AuthService , private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.authService.login(username, password).subscribe(
        response => {
          console.log('Login successful:', response);
  
          // Ensure that the response includes both token and role
          if (response.token && response.role) {
            // Set token and role in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
  
            // Navigate based on user role
            if (response.role === 'admin') {
              this.router.navigate(['/admin-dashboard']); // Navigate to admin dashboard
            } else if (response.role === 'user') {
              this.router.navigate(['/user-dashboard']); // Navigate to user dashboard
            } else {
              console.error('Unexpected role:', response.role);
              // Optionally handle unexpected roles
            }
          } else {
            console.error('Unexpected response structure:', response);
          }
        },
        error => {
          console.error('Login failed:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  
  
  
}
