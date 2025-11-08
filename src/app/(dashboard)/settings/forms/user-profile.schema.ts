import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z, { TypeOf } from "zod";

const userSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
});

export type TUserSchema = z.infer<typeof userSchema>;
export const useUserForm = () =>
  useForm<TUserSchema>({ resolver: zodResolver(userSchema) });
