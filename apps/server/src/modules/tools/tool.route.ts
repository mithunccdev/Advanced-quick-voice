import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import { requirePermission } from "../../middleware/authorize.middleware.js";
import validate from "../../middleware/validate.middleware.js";
import * as toolController from "./tool.controller.js";
import { createToolSchema, updateToolSchema, testToolSchema } from "./tool.schema.js";

const router = Router();

router.post(
  "/test",
  authMiddleware,
  requirePermission({ tools: ["read"] }),
  validate(testToolSchema),
  toolController.testTool
);

router.get(
  "/",
  authMiddleware,
  requirePermission({ tools: ["read"] }),
  toolController.listTools
);

router.post(
  "/",
  authMiddleware,
  requirePermission({ tools: ["create"] }),
  validate(createToolSchema),
  toolController.createTool
);

router.patch(
  "/:toolId",
  authMiddleware,
  requirePermission({ tools: ["update"] }),
  validate(updateToolSchema),
  toolController.updateTool
);

router.delete(
  "/:toolId",
  authMiddleware,
  requirePermission({ tools: ["delete"] }),
  toolController.deleteTool
);

router.get(
  "/agent/:agentId",
  authMiddleware,
  requirePermission({ tools: ["read"] }),
  toolController.getAgentTools
);

router.post(
  "/:toolId/attach/:agentId",
  authMiddleware,
  requirePermission({ tools: ["update"] }),
  toolController.attachTool
);

router.delete(
  "/:toolId/detach/:agentId",
  authMiddleware,
  requirePermission({ tools: ["update"] }),
  toolController.detachTool
);

export default router;
