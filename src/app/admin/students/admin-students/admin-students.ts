import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentsService } from '../student.service';
import { CoursesService } from '../../courses/admin-courses.service';  


@Component({
  standalone: true,
  selector: 'app-admin-students',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-students.html',
  styleUrls: ['./admin-students.css']
})
export class AdminStudentsComponent implements OnInit {

  private fb = inject(FormBuilder);
  private studentsService = inject(StudentsService);
  private CoursesService = inject(CoursesService);

  students: any[] = [];
  courses: any[] = [];   
  form!: FormGroup;

  loading = false;
  submitting = false;

  ngOnInit() {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      rollNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      courseId: [null, Validators.required] // 🔥

    });

    this.loadStudents();
      this.loadCourses();   // ⬅ IMPORTANT

  }
  loadCourses() {
  this.CoursesService.getCourses().subscribe({
    next: res => this.courses = res,
    error: err => console.error(err)
  });
}
getCourseName(courseId: number): string {
  const course = this.courses.find(c => c.id === courseId);
  return course ? course.name : '-';
}


  loadStudents() {
    this.loading = true;
    this.studentsService.getStudents().subscribe({
      next: res => {
        this.students = res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  addStudent() {
  if (this.form.invalid) return;

  this.submitting = true;

  const payload = {
    ...this.form.value,
    courseId: Number(this.form.value.courseId), // ✅ ensure number
    createdOn: new Date().toISOString()
  };

  this.studentsService.addStudent(payload).subscribe({
    next: (res: { data: any }) => {
      // ✅ push the actual student object returned by API
      this.students = [...this.students, res.data];

      this.form.reset();
      this.submitting = false;
    },
    error: () => {
      this.submitting = false;
    }
  });
}

  
  deleteStudent(id: number) {
    if (!confirm('Delete student?')) return;

    this.loading = true;

    this.studentsService.deleteStudent(id).subscribe({
      next: () => {
        this.students = this.students.filter(s => s.id !== id);
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
