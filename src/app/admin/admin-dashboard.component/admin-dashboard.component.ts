import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [CommonModule,RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  
  stats = [
    { title: 'Students', icon: '👨‍🎓', link: '/admin/students' },
    { title: 'Teachers', icon: '👩‍🏫', link: '/admin/teachers' },
    { title: 'Events', icon: '📅', link: '/admin/events' },
    { title: 'Courses', icon: '📚', link: '/admin/courses' },
  ];
}
