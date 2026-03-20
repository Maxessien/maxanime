import { unlink } from "fs/promises";

const deleteFileAtPath = async (filePath: string): Promise<void> => {
  if (!filePath?.trim()) {
    return;
  }

  try {
    await unlink(filePath);
  } catch (err) {
    const error = err as NodeJS.ErrnoException;

    if (error.code === "ENOENT") {
      return;
    }

    console.error("Failed to delete local file", {
      filePath,
      message: error.message,
    });
    throw err;
  }
};

export { deleteFileAtPath };
