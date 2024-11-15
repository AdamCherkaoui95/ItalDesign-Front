import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as THREE from 'three';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  driverTracks: any = { audio: [], video: [] };
  passengerTracks: any = { audio: [], video: [] };
  selectedDriverTrack: any;
  selectedPassengerTrack: any;
  driverMediaType: string = 'audio'; // default to 'audio'
  passengerMediaType: string = 'audio'; // default to 'audio'

  currentTime: string | undefined;

  constructor(private http: HttpClient) {
    this.currentTime = this.getCurrentTime(); // Initialisation avec l'heure actuelle
  }

  ngOnInit() {
    this.http.get('assets/media.json').subscribe((data: any) => {
      this.driverTracks = data.driver;
      this.passengerTracks = data.passenger;
    });

    // Met à jour l'heure toutes les secondes
    setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 1000);
  }

  // Fonction pour obtenir l'heure actuelle sous forme de chaîne de caractères
  getCurrentTime(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  selectDriverTrack(track: any) {
    this.selectedDriverTrack = track;
    console.log(track);
  }

  selectPassengerTrack(track: any) {
    this.selectedPassengerTrack = track;
  }

  setDriverMediaType(type: string) {
    this.driverMediaType = type;
  }

  setPassengerMediaType(type: string) {
    this.passengerMediaType = type;
  }
}
