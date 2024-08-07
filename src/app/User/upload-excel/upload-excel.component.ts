import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { WeatherService } from '../weather.service';



import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-excel',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './upload-excel.component.html',
  styleUrl: './upload-excel.component.scss'
})
export class UploadExcelComponent {
  data: any[] = [];
  headers: string[] = [];
  weatherData: any[] = [];

  constructor(private weatherService: WeatherService) { }

  onFileChange(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.headers = jsonData[0] as string[];
      this.data = jsonData.slice(1);
      this.fetchWeatherData();
    };

    reader.readAsBinaryString(target.files[0]);
  }

  fetchWeatherData() {
    this.weatherData = [];
    this.data.forEach(row => {
      const city = (row[3] || '').trim();
      const district = (row[2] || '').trim();
      const state = (row[1] || '').trim();
      const country = (row[0] || '').trim();
  
      // Construct the location string
      const location = [city, district, state, country].filter(part => part).join(', ');
  
      if (location) {
        this.weatherService.getWeather(location).subscribe(
          weather => {
            // Log the data received from the Weather API
            console.log(`Weather data for ${location}:`, weather);
  
            this.weatherData.push({
              location: location,
              weather: weather
            });
          },
          error => {
            console.error(`Failed to fetch weather for ${location}:`, error);
          }
        );
      } else {
        console.error('Location is empty, skipping API call.');
      }
    });
  }
  
  
}
