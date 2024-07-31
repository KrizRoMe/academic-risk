export type RiskItem = {
    id: number;
    courseId: number;
    academicPeriodId: number;
    value1: number;
    value2: number;
    value3: number;
    updatedAt: Date;
    createdAt: Date;
    course: string;
    courseCode: string;
    semester: number;
    failures: number;
  }