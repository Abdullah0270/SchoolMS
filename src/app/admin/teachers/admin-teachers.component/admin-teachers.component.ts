import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeachersService } from '../teachers.service';
import { CoursesService } from '../../courses/admin-courses.service';

@Component({
  standalone: true,
  selector: 'app-admin-teachers',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-teachers.component.html'
})
export class AdminTeachersComponent implements OnInit {

  private fb = inject(FormBuilder);
  private teachersService = inject(TeachersService);
  private coursesService = inject(CoursesService);

  courses: any[] = [];   
  teachers: any[] = [];
  form!: FormGroup;

  loading = false;
  submitting = false;

  ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      phone: ['', Validators.required],
      courseId: [null, Validators.required]
    });

    this.loadTeachers();
    this.loadCourses();
  }
  loadCourses() {
  this.coursesService.getCourses().subscribe({
    next: res => this.courses = res,
    error: err => console.error(err)
  });
}

  loadTeachers() {
    this.loading = true;
    this.teachersService.getTeachers().subscribe({
      next: res => {
        this.teachers = res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  addTeacher() {
    if (this.form.invalid) return;

    this.submitting = true;

    const payload = {
      ...this.form.value,
      courseId: Number(this.form.value.courseId), // ✅ ensure number
      createdOn: new Date().toISOString()
    };

    this.teachersService.addTeacher(payload).subscribe({
      next: (res: { data: any }) => {
        // ✅ push the actual student object returned by API
        this.teachers = [...this.teachers, res.data];

        this.form.reset();
        this.submitting = false;
      },
      error: () => {
        this.submitting = false;
      }
    });


  }

  deleteTeacher(id: number) {
    if (!confirm('Delete teacher?')) return;

    this.loading = true;

    this.teachersService.deleteTeacher(id).subscribe({
      next: () => {
        this.teachers = this.teachers.filter(t => t.id !== id);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
