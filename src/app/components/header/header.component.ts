import { Component, inject } from '@angular/core';
import { UtilsService } from '../../core/services/utils.service';
import { AuthFirebaseService } from '../../core/services/auth.firebase.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  utlSvc = inject(UtilsService)
  authSvc = inject(AuthFirebaseService)
  user:any;

  ngOnInit(): void {
    this.authSvc.user$.subscribe(user=>{
      this.user=user
    })
  }

  logout(){
    this.authSvc.logout()
  }
  goto(path: string) {
    this.goto(path)
  }

}
