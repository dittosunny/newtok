import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    RouterLink,
    MatButtonModule
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  formData: any[] = [];
  displayedColumns: string[] = ['country', 'state', 'district', 'city']

  constructor(private locationService: WeatherService) {}

  ngOnInit(): void {
    this.fetchFormData();
  }

  fetchFormData(): void {
    this.locationService.getLocationData().subscribe(
      response => {
        this.formData = response.data;
        console.log('Form data retrieved:', this.formData);
      },
      error => {
        console.error('Failed to retrieve form data:', error);
      }
    );
  }
}
