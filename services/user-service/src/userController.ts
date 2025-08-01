import { asyncHandler } from "../../../shared/middleware";
import { Request, Response } from "express";
import { UserService } from "./userService";
import { createErrorResponse, createSuccessResponse } from "../../../shared/utils";

const userService = new UserService();

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json(createErrorResponse("User not authenticated"));
  }

  const profile = await userService.getProfile(userId);

  res
    .status(200)
    .json(
      createSuccessResponse(profile, "User profile retrieved successfully")
    );
});

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      return res
        .status(401)
        .json(createErrorResponse("User not authenticated"));
    }

    const profile = await userService.updateProfile(userId, req.body);

    res
      .status(200)
      .json(
        createSuccessResponse(profile, "User profile updated successfully")
      );
  }
);

export const deleteProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      return res
        .status(401)
        .json(createErrorResponse("User not authenticated"));
    }

    await userService.deleteProfile(userId);

    res.status(204).json(createSuccessResponse(null, "Profile deleted")); // No content response
  }
);
