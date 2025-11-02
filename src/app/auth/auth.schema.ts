import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const authSchema = z.object({
  email: z.email({ error: "Email schema isn't correct" }),
  password: z.string().min(6, "Min length of password is 6"),
});

export type TAuthSchema = z.infer<typeof authSchema>;
export const useAuthForm = () =>
  useForm<TAuthSchema>({
    resolver: zodResolver(authSchema),
    mode: "onChange",
  });
