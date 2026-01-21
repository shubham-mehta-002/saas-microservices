import { Router } from "express";
import {createGig, listGigs,getGigsDetails} from "../controller/gig.controller.js";
import { applyToGig } from "../controller/proposal.controller.js";
import { injectUserFromGateway } from "@project/shared/server";

const router : Router = Router();

// Public Routes
router.get('/list',listGigs);
router.get("/:gigId",getGigsDetails);

// private routes
router.post("/private/create",injectUserFromGateway ,createGig);
router.post("/private/:id/apply",injectUserFromGateway ,applyToGig);


export default router;