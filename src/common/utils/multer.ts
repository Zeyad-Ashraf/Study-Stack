import { diskStorage } from 'multer';
import { fileTypeFromBuffer } from 'file-type';
import { videoTypes } from '../constants';

// this function is used to check if the file is a real video or not
async function isRealVideoFile(file: Express.Multer.File): Promise<boolean> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  const type = await fileTypeFromBuffer(file.buffer);

  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    !!type && videoTypes.includes(type.mime) && type.mime === file.mimetype
  );
}

// this function is used to check if the file is a real video or not
export const multerCloudinary = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const storage = diskStorage({});

  const fileFilter = async (
    req: Request,
    file: Express.Multer.File,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    cb: Function,
  ) => {
    const isVideo = await isRealVideoFile(file);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    if (!isVideo) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      return cb(new Error('Invalid file type'), false);
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    cb(null, true);
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { storage, fileFilter };
};
