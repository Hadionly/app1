export interface User {
    userId: string;
    userName: string;
    userEmail: string;
    userPhone: string;
    userPhoto: string;
    studentId: number;
    createdAt: number;
    isAdmin: boolean,
    isProf: boolean,
    isStudent: boolean,
    isTutor: boolean,
    courseId: string
}
