import { WaifuimEntityBase } from '../WaifuimEntityBase';
import type { WaifuimSDK } from '../WaifuimSDK';
import type { Control } from '../types';
import type { Image, ImageListMatch } from '../WaifuimTypes';
declare class ImageEntity extends WaifuimEntityBase<Image> {
    constructor(client: WaifuimSDK, entopts: any);
    make(this: ImageEntity): ImageEntity;
    list(this: any, reqmatch?: ImageListMatch, ctrl?: Control): Promise<ImageEntity[]>;
}
export { ImageEntity };
