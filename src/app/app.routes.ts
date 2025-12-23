import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component/login.component';
import { SignupComponent } from './auth/signup/signup.component/signup.component';
import { authGuard } from './auth/auth-guard';
import { roleGuard } from './auth/role-guard';
import { AdminLayoutComponent } from './admin/admin-layout.component/admin-layout.component';

export const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] },
    // loadComponent: () =>
    //   import('./admin/admin-dashboard.component/admin-dashboard.component')
    //     .then(m => m.AdminDashboardComponent)
    children: [
    { path: 'dashboard', loadComponent: () => import('./admin/admin-dashboard.component/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
    { path: 'students', loadComponent: () => import('./admin/students/admin-students/admin-students').then(m => m.AdminStudentsComponent) },
    { path: 'teachers', loadComponent: () => import('./admin/teachers/admin-teachers.component/admin-teachers.component').then(m => m.AdminTeachersComponent) },
    { path: 'events', loadComponent: () => import('./events/admin-events.component/admin-events.component').then(m => m.AdminEventsComponent) },
    { path: 'courses', loadComponent: () => import('./admin/courses/admin-courses.component/admin-courses.component').then(m => m.AdminCoursesComponent) },


    // { path: 'attendance', loadComponent: () => import('./attendance/attendance.component').then(m => m.AttendanceComponent) },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ]
  },

  {
    path: 'teacher',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['teacher'] },
    loadComponent: () =>
      import('./teacher/teacher-dashboard.component/teacher-dashboard.component')
        .then(m => m.TeacherDashboardComponent)
  },

  {
    path: 'student',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['student'] },
    loadComponent: () =>
      import('./student/student-dashboard.component/student-dashboard.component')
        .then(m => m.StudentDashboardComponent)
  }
];
