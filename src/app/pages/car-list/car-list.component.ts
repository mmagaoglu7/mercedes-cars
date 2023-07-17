import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { ApiService } from 'src/app/sevices/api.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {
  public carData: Array<Car> = [];

  constructor(public apiService: ApiService, public router: Router) { }

  ngOnInit() {
    this.apiService.getCarsData().subscribe(resp => {
      this.carData = resp;
    })
  }

  editCar(id: number) {
    this.router.navigate(
      ['/car-edit'],
      { queryParams: { id: id } }
    );
  }
}
