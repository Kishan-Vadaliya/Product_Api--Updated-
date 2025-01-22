import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../error-handler/applicationError";
import {
  productSchema,
  multipleProductSchema,
} from "../validation/productValidation";

const validateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = productSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error) {
      const formattedErrors = error.details.map((detail) => ({
        field: detail.context?.key || "unknown",
        message: detail.message.replace(/['"]/g, ""),
      }));
      return next(
        new ApplicationError("Validation failed", 400, formattedErrors)
      );
    }
    next();
  } catch (err) {
    next(new ApplicationError("Validation error", 400));
  }
};

const multipleValidateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = multipleProductSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });

    if (error) {
      const formattedErrors = error.details.map((detail) => ({
        field: detail.context?.key || "unknown",
        message: detail.message.replace(/['"]/g, ""),
      }));
      return next(
        new ApplicationError("Validation failed", 400, formattedErrors)
      );
    }
    next();
  } catch (err) {
    next(new ApplicationError("Validation error", 400));
  }
};

export { validateRequest, multipleValidateRequest };
