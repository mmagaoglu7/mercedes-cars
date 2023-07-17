import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { ApiService } from 'src/app/sevices/api.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit {
  public colorData: Array<Color> = [];
  public carForm: FormGroup;
  constructor(public route: ActivatedRoute, public router: Router, public apiService: ApiService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.getCarData(params['id']);
        this.buildForm();
        this.getColorData();
      }
    );
  }

  getCarData(id: number){
   this.apiService.getCarById(id).subscribe(resp => {
    this.carForm.patchValue(resp);
   })
  }

  getColorData(){
    this.apiService.getColorsData().subscribe(resp =>{
      this.colorData = resp;
    })
  }

  buildForm() {
    this.carForm = new FormGroup({
      id: new FormControl({value: null, disabled: true}, Validators.required),
      carId: new FormControl({value: null, disabled: true}, Validators.required),
      stockStatus: new FormControl(null),
      hp: new FormControl(null,Validators.required),
      price: new FormControl(null,Validators.required),
      colorId: new FormControl(null,Validators.required),
    });    
  }

  saveChanges(carForm: FormGroup){
    this.carForm.enable();
    if(carForm.value.hp > 99 && carForm.value.hp < 551) // We can add a custom validator for HP file :)
    {
      this.apiService.editCar(carForm.value).subscribe(resp =>{
        this.router.navigate(['/']);
      });
    }
    else{
      alert('The HP value has to be between 100 and 550 !!!')
    }
  }

  cancel(){
    this.router.navigate(['/']);
  }
}
