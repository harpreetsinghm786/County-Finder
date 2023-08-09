import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Map, NullType } from 'maplibre-gl';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;

  lat: number = 0;
  lang: number = 0;
  countryname: string = '';
  city: string = '';
  continent: string = '';
  flag: string = '';
  languages: any = [];
  aka: any = [];
  isdata: boolean = false;
  progress: boolean = false;
  directions: string = '';
  population: number = 0;
  area: number = 0;
  capital: string = '';
  query: string = '';

  @ViewChild('map')
  private mapContainer: ElementRef<HTMLElement>;

  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}
  httpoptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  ngOnDestroy(): void {
    this.map?.remove();
  }

  openSnackBar(message: string) {
    this.snackbar.open(message, 'OK', {
      panelClass: ['snackbar'],
      horizontalPosition: 'start',
      duration: 5000,
    });
  }
  ngAfterViewInit(): void {
    this.lat = 12.97811;
    this.lang = 77.589;
    this.initMap(this.lat, this.lang, 10);
  }

  initMap(lat: number, lng: number, zoom: number) {
    const initialState = { lng: lng, lat: lat, zoom: zoom };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=slCwG0U42ZTgQEryZnzh`,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    });
  }

  ngOnInit(): void {}

  getcoor() {
    this.map.on('click', (e) => {
      this.lat = e.lngLat.lat;
      this.lang = e.lngLat.lng;
      console.log(this.lat);
      this.isdata = true;
      this.progress = true;
      this.getDetailsFromCoor(this.lat, this.lang);
    });
  }

  getDetailsFromCoor(lat: number, lng: number) {
    this.countryname = '';
    this.city = '';
    this.continent = '';

    this.http
      .get<any>(
        'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' +
          lat +
          '&longitude=' +
          lng +
          '&localityLanguage=en/',
        this.httpoptions
      )
      .subscribe(
        (res) => {
          this.countryname = res['countryName'];
          this.city = res['city'];
          this.continent = res['continent'];
          this.progress = false;
          this.getDetailsFromName(this.countryname);
        },
        (err) => {
          this.progress = false;
          this.isdata = false;
          if (err.status === 404) {
            this.openSnackBar('Country Not Found!!');
          }
        }
      );
  }

  getDetailsFromName(name: string) {
    this.flag = '';
    this.languages = [];
    this.aka = [];
    this.directions = '';
    this.population = 0;
    this.area = 0;
    this.capital = '';

    let url = 'https://restcountries.com/v3.1/name/' + name;

    this.http.get<any>(url, this.httpoptions).subscribe(
      (res) => {
        if (res[res.length - 1]['flags']['svg']) {
          this.flag = res[res.length - 1]['flags']['svg'];
        }
        this.languages = Object.values(res[0]['languages']);
        this.aka = res[res.length - 1]['altSpellings'];
        this.directions = res[res.length - 1]['maps']['googleMaps'];
        this.population = res[res.length - 1]['population'];
        this.area = res[res.length - 1]['area'];

        this.capital = res[res.length - 1]['capital'][0];
      },
      (err) => {
        this.progress = false;
        this.isdata = false;
        if (err.status === 404) {
          this.openSnackBar('Country Not Found!!');
        }
      }
    );
  }

  getDetailsFromSearch() {
    if (this.query !== '') {
      this.isdata = true;
      this.progress = true;
      this.flag = '';
      this.languages = [];
      this.aka = [];
      this.directions = '';
      this.population = 0;
      this.area = 0;
      this.capital = '';

      let url = 'https://restcountries.com/v3.1/name/' + this.query;

      this.http.get<any>(url, this.httpoptions).subscribe(
        (res) => {
          this.flag = res[res.length - 1]['flags']['svg'];
          this.languages = Object.values(res[0]['languages']);
          this.aka = res[res.length - 1]['altSpellings'];
          this.directions = res[res.length - 1]['maps']['googleMaps'];
          this.population = res[res.length - 1]['population'];
          this.area = res[res.length - 1]['area'];
          this.capital = res[res.length - 1]['capital'][0];
          this.lat = res[res.length - 1]['latlng'][0];
          this.lang = res[res.length - 1]['latlng'][1];

          this.getDetailsFromCoor(this.lat, this.lang);
          this.initMap(this.lat, this.lang, 6);
          this.progress = false;
        },
        (err) => {
          this.progress = false;
          this.isdata = false;
          if (err.status === 404) {
            this.openSnackBar('Country Not Found!!');
          }
        }
      );
    } else {
      this.openSnackBar('Country Name is Required');
    }
  }

  goToLink() {
    window.open(this.directions, '_blank');
  }
}
