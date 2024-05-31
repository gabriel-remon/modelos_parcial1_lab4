import { Component, inject } from '@angular/core';
import { UtilsService } from '../../core/services/utils.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {


  utilSvc = inject(UtilsService)
  data:any

  ngOnInit(): void {
    this.utilSvc.getInfoGitHub().subscribe(data=>{
      this.data = data
     
    })
  }
}
