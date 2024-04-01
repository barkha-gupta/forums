import { z } from "zod";

export const ForumValidation = z.object({
  forum: z.string().min(3, { message: "Minimum 3 characters" }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  forum: z.string().min(3, { message: "Minimum 3 characters" }),
});
