import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const createWorkingHoursSchema = z.object({
  from: z.string(),
  to: z.string(),
  day: z.string(),
});

export type TCreateWorkingHoursSchema = z.infer<
  typeof createWorkingHoursSchema
>;
export const useCreateWorkingHourForm = () =>
  useForm<TCreateWorkingHoursSchema>({
    resolver: zodResolver(createWorkingHoursSchema),
    mode: "all",
    // defaultValues: {
    //   from: "",
    //   to: "",
    //   day: "",
    // },
  });

const updateWorkingHoursSchema = createWorkingHoursSchema.partial();
export type TUpdateWorkingHoursSchema = z.infer<
  typeof updateWorkingHoursSchema
>;
export const useUpdateWorkingHourForm = () =>
  useForm<TUpdateWorkingHoursSchema>({
    resolver: zodResolver(updateWorkingHoursSchema),
    mode: "onChange",
  });
