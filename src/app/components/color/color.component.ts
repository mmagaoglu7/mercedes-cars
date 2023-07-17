import { Component, Input } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ApiService } from 'src/app/sevices/api.service';

@Component({
  selector: 'color-box',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})

export class ColorComponent {

  public color: Color = new Color();

  @Input()
  public set colorId(colorId: number) {
    this.apiService.getColorById(colorId).subscribe(resp => {
      this.color = resp;
    });
  }

  constructor(private apiService: ApiService) { }
}
