import { ArtistEntity } from './entity/ArtistEntity';
import { ImageEntity } from './entity/ImageEntity';
export type * from './WaifuimTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { WaifuimEntityBase } from './WaifuimEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class WaifuimSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Artist(entopts?: Record<string, any>): ArtistEntity;
    Image(entopts?: Record<string, any>): ImageEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): WaifuimSDK;
    tester(testopts?: any, sdkopts?: any): WaifuimSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof WaifuimSDK;
export { stdutil, config, BaseFeature, WaifuimEntityBase, WaifuimSDK, SDK, };
