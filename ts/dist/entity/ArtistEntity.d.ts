import { WaifuimEntityBase } from '../WaifuimEntityBase';
import type { WaifuimSDK } from '../WaifuimSDK';
import type { Control } from '../types';
import type { Artist, ArtistListMatch } from '../WaifuimTypes';
declare class ArtistEntity extends WaifuimEntityBase<Artist> {
    constructor(client: WaifuimSDK, entopts: any);
    make(this: ArtistEntity): ArtistEntity;
    list(this: any, reqmatch?: ArtistListMatch, ctrl?: Control): Promise<ArtistEntity[]>;
}
export { ArtistEntity };
