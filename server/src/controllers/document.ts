import { NextFunction, Request, Response } from "express";
import Document from "../models/document";
import { v2 } from "cloudinary";
import User from "../models/user";
/**
 * Determine the file type based on MIME type
 * @param {string} mimeType - the MIME type of the file
 * @returns {string} - the file type ["image","text","pdf"]
 */

const getFileType = (mimeType: string) => {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType === "application/pdf") return "pdf";
  if (mimeType === "text/plain") return "text";
  return "other";
};

export const uploadDocuments = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const documents = [];

    if (req.files) {
      if (Array.isArray(req.files)) {
        for (const file of req.files) {
          //   const result = await v2.uploader.upload(file.path);
          const document = new Document({
            owner: req.user,
            name: file.originalname,
            // url: result.secure_url,
            url: file.filename,
            size: file.size,
            type: getFileType(file.mimetype),
          });
          await document.save();
          documents.push(document);
        }
      } else {
        for (const fieldName in req.files) {
          const fileArray = req.files[fieldName];
          for (const file of fileArray) {
            // const result = await v2.uploader.upload(file.path);
            const document = new Document({
              owner: req.user,
              name: file.originalname,
              // url: result.secure_url,
              url: file.filename,
              size: file.size,
              type: getFileType(file.mimetype),
            });
            await document.save();
            documents.push(document);
          }
        }
      }
    }

    resp.status(200).json({
      message: "documents uploaded successfully",
      documents,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getAllDocuments = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    const documents = await Document.find({
      owner: user,
    }).populate("owner", "username email avatar");
    resp.status(200).json({
      message: "document fetch successfully",
      documents,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "failed to fetch document",
    });
  }
};

export const searchDocuments = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    const { name } = req.params;
    const documents = await Document.find({
      name: new RegExp(name, "i"),
      owner: user,
    });
    resp.status(200).json(documents);
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "failed to fetch document",
    });
  }
};

export const togglePrivancy = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    const { docId } = req.params;
    const { status } = req.body;

    const document = await Document.findById(docId).populate(
      "owner",
      "username avatar email"
    );

    if (!document) {
      return resp.status(400).json({
        message: "Document not found",
      });
    }

    document.isPublic = status;
    await document.save();

    resp.status(200).json({
      message: "updated",
      document,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "failed to fetch document",
    });
  }
};

export const getDocument = async (
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  try {
    const { docId } = req.params;
    const document = await Document.findById(docId).populate(
      "owner",
      "username email avatar"
    );

    if (!document) {
      return resp.status(400).json({
        message: "Document not found",
      });
    }

    document.url = `${process.env.SERVER_URL}/view/${document.url}`;
    resp.status(200).json({
      document,
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "failed to fetch document",
    });
  }
};
