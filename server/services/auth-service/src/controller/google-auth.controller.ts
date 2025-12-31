import { Request, Response } from "express";
import { asyncHandler, } from "@project/shared/server";

export const googleAuthCallback = asyncHandler(
  async (req: Request, res: Response) => {
    const user = req.user as any;

    const { accessToken, refreshToken } = user.generateTokens();
    // const { password, refreshTokens } = user.toObject();

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.redirect(
      `${process.env.CLIENT_URL}/success`
    );
  }
);
