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
  
  // Dummy stats, baad me API se replace karenge
  stats = [
    { title: 'Students', count: 120, icon: '👨‍🎓', link: '/admin/students' },
    { title: 'Teachers', count: 15, icon: '👩‍🏫', link: '/admin/teachers' },
    { title: 'Events', count: 8, icon: '📅', link: '/admin/events' },
    { title: 'Attendance', count: 100, icon: '✅', link: '/admin/attendance' },
  ];
}
