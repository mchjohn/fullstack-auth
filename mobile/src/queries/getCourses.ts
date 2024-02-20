import { useQuery } from "@tanstack/react-query";

import { api } from "@/api";
import { Courses } from "@/types";

export const getCourses = () => {
  return useQuery({
    queryKey: ["COURSES"],
    queryFn: async () => {
      const { data } = await api.get<Promise<Courses[]>>("/courses");
      return data;
    }
  });
};
