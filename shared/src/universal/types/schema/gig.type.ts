import {z} from "zod"
import { createGigSchema } from "../../schemas/gig.zod.js";
import { proposalStatus, gigStatus } from "../../constants.js";

export type createGigInputType = z.infer<typeof createGigSchema>
export type gigStatusType = typeof gigStatus[number];
export type ProposalStatusType = typeof proposalStatus[number];
