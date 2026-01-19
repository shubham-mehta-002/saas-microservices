import {z} from "zod"
import { createGigSchema } from "../../schemas/gig.zod.js";
import { gigApplicationStatus, gigStatus } from "../../constants.js";

export type createGigInputType = z.infer<typeof createGigSchema>
export type gigStatusType = typeof gigStatus[number];
export type gigApplicationStatusType = typeof gigApplicationStatus[number];
