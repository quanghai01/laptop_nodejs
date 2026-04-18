import { z } from "zod";

export const productSchema = z.object({
    name: z.string().trim().min(3, "Product name must be at least 3 characters long"),
    description: z.string().default(""),
    price: z.coerce.number().min(0, "Product price must be at least 0"),
    quantity: z.coerce.number().min(0, "Product quantity must be at least 0"),
    sold: z.coerce.number().min(0).optional().default(0),
    image: z.string().default(""),
    categoryId: z.coerce.number().int().min(1, "Please select a valid category"),
});

export type ProductSchema = z.infer<typeof productSchema>;