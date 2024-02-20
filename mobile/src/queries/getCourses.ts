import { useQuery } from "@tanstack/react-query";

import { getCourses } from "@/api";

export const useCourses = () => {
  return useQuery({
    queryKey: ["COURSES"],
    queryFn: () => getCourses(),
  });
};
