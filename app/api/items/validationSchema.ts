import { z } from "zod";

export const createIssueSchema = z.object({
    name: z.string().min(1, 'name is required').max(255),
    description: z.string().min(1, 'description is required'),
    price: z.string().min(1, 'price is required'),
    image: z.string().min(1, 'image is required'),
});
