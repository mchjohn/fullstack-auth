import { create } from "zustand";

import { Courses } from "@/types";

type CourseStore = {
  courses: Courses[];
  isLoading: boolean;
  loadCourses: (courses: Courses[]) => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
  courses: [],
  isLoading: false,
  loadCourses: (courses) => {
    set({ isLoading: true });

    set({ courses });

    set({ isLoading: false });
  }
}));
