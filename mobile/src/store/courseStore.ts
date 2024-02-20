import { create } from "zustand";

import { Courses } from "@/types";
import { getCourses } from "@/queries/getCourses";

type CourseStore = {
  courses: Courses[];
  loadCourses: () => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
  courses: [],
  loadCourses: () => {
    const { data } = getCourses();

    if (data) {
      set({ courses: data });
    }
  }
}));
