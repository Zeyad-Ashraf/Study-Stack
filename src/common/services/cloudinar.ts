import { Injectable } from '@nestjs/common';
// import { UploadApiOptions } from 'cloudinary';
// import { cloudinaryConfig } from 'src/common';
// import { cloudLnk } from 'src/DB';
// import fs from 'fs';

@Injectable()
export class CloudinaryService {
  constructor() {}

//   async UploadSesson(
//     file: Express.Multer.File,
//     options: UploadApiOptions,
//   ): Promise<cloudLnk> {
//     let uploadedSize = 0;
//     const totalSize = fs.statSync(file.path).size;
//     const upload_stream = cloudinaryConfig().uploader.upload_stream(
//       resource_type: 'video',
//       chunk_size: 20000000,
//       ...options,
//     );
//     return { secure_url, public_id };
//   }
}
