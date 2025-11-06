export interface ClassRoom {
  id: string;
  name: string;
  code: string;
  syllabusUrl: string;
  description: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
}

export interface Enrollment {
  id: string;
  student: Student;
  joinedAt: string;
  classroomId: string;
}
