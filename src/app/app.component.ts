import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'demo-app';

  constructor(private router:Router)
  {
  }

  goToEmployeeView() {
    this.router.navigate(['/employee']);
  }

  goToDepartments() {
    this.router.navigate(['/department']);
  }
}


