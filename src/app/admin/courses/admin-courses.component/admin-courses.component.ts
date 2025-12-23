import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CoursesService } from '../admin-courses.service';

@Component({
  standalone: true,
  selector: 'app-admin-courses',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit {

  private fb = inject(FormBuilder);
  private coursesService = inject(CoursesService);

  courses: any[] = [];
  form!: FormGroup;

  loading = false;
  submitting = false;

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      creditHours: [1, [Validators.required, Validators.min(1)]],
      isActive: [true]
    });

    this.loadCourses();
  }

  loadCourses() {
    this.loading = true;
    this.coursesService.getCourses().subscribe({
      next: res => {
        this.courses = res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  addCourse() {
    if (this.form.invalid) return;

    this.submitting = true;

    const payload = {
      ...this.form.value,
      createdOn: new Date().toISOString()
    };

    this.coursesService.addCourse(payload).subscribe({
      next: (res: any) => {
        // agar backend { message, data } bhej raha ho
        const course = res.data ?? res;
        this.courses = [...this.courses, course];
        this.form.reset({ isActive: true });
        this.submitting = false;
      },
      error: () => this.submitting = false
    });
  }

  deleteCourse(id: number) {
    if (!confirm('Delete course?')) return;

    this.loading = true;

    this.coursesService.deleteCourse(id).subscribe({
      next: () => {
        this.courses = this.courses.filter(c => c.id !== id);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
