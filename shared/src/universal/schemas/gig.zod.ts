import { z } from "zod";

export const createGigSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().min(1, "Description is required"),
    budget: z.number().positive("Budget must be positive"),
    category: z.string().optional(),
    skillsRequired: z.array(z.string()).default([])
});


export const applyToGigSchema = z.object({
    proposal: z.string().trim().min(1, "Proposal is required"),
    bidAmount : z.number().positive("Amount must be positive")
})