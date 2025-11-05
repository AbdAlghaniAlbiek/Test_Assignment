import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { tagsItems } from "../componenets/tag";

const createArticleSchema = z.object({
  title: z.string().min(4),
  category: z.string(),
  // tags: z
  //   .array(
  //     z.object({ id: z.number(), label: z.string(), isSelected: z.boolean() })
  //   )
  //   .optional(),
  isPublished: z.boolean().optional(),
  content: z.string().min(6),
  schedulePublishedDate: z.date().nullable().optional(),
  coverImage: z.string().optional(),
});
export type TCreateArticleSchema = z.infer<typeof createArticleSchema>;
export const useCreateArticleForm = () =>
  useForm<TCreateArticleSchema>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: "",
      content: "",
      category: {},
      isPublished: false,
      schedulePublishedDate: null,
      coverImage: "",
      tags: tagsItems,
    },
  });

const updateArticleSchema = createArticleSchema
  .partial()
  .omit({ coverImage: true });
export type TUpdateArticleSchema = z.infer<typeof updateArticleSchema>;
export const useUpdateArticleForm = () =>
  useForm<TUpdateArticleSchema>({
    resolver: zodResolver(updateArticleSchema),
    mode: "onChange",
  });
