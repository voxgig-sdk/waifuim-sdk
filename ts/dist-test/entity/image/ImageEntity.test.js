"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ImageEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WAIFUIM_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WAIFUIM_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WaifuimSDK.test();
        const ent = testsdk.Image();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WAIFUIM_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'image.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "artist": { "a": true, "h": "Artist", "n": "artist", "r": false, "t": "`$OBJECT`", "key$": "artist", "index$": 0 }, "category": { "a": true, "h": "Category", "n": "category", "r": false, "sh": "Category of the image", "t": "`$STRING`", "key$": "category", "index$": 1 }, "height": { "a": true, "h": "Height", "n": "height", "r": false, "sh": "Image height in pixels", "t": "`$INTEGER`", "key$": "height", "index$": 2 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Unique identifier for the image", "t": "`$STRING`", "key$": "id", "index$": 3 }, "thumbnail": { "a": true, "fo": "uri", "h": "Thumbnail", "n": "thumbnail", "r": false, "sh": "URL to the thumbnail version of the image", "t": "`$STRING`", "key$": "thumbnail", "index$": 4 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": false, "sh": "URL to the image", "t": "`$STRING`", "key$": "url", "index$": 5 }, "width": { "a": true, "h": "Width", "n": "width", "r": false, "sh": "Image width in pixels", "t": "`$INTEGER`", "key$": "width", "index$": 6 } }, "id": { "field": "id", "name": "id" }, "name": "image", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /images", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "category", "or": "category", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": 1, "k": "query", "n": "page", "or": "page", "r": false, "t": "`$INTEGER`", "index$": 1 }, { "a": true, "ex": 30, "k": "query", "n": "page_size", "or": "page_size", "r": false, "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/images", "q": { "exist": ["category", "page", "page_size"] }, "r": {}, "s": [{ "lit": "images" }], "t": { "req": "`reqdata`", "res": "`body.images`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "image", "name__orig": "image", "Name": "Image", "name_": "image", "name-": "image", "NAME": "IMAGE", "index$": 1 }, { "active": true, "entity": "image", "key$": "BasicImageFlow", "kind": "basic", "name": "BasicImageFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "image_ref01" } }], "index$": 0 }] }, 'Image', { "GET /images": { "protocol": "http", "operationId": "getImagesList", "responses": { "200": { "description": "Successful response with list of images", "content": { "application/json": { "schema": { "type": "object", "properties": { "images": { "items": { "properties": { "artist": { "properties": { "id": { "description": "Artist identifier", "type": "string" }, "name": { "description": "Artist name", "type": "string" } }, "type": "object", "key$": "artist" }, "category": { "description": "Category of the image", "type": "string", "key$": "category" }, "height": { "description": "Image height in pixels", "type": "integer", "key$": "height" }, "id": { "description": "Unique identifier for the image", "type": "string", "key$": "id" }, "thumbnail": { "description": "URL to the thumbnail version of the image", "format": "uri", "type": "string", "key$": "thumbnail" }, "url": { "description": "URL to the image", "format": "uri", "type": "string", "key$": "url" }, "width": { "description": "Image width in pixels", "type": "integer", "key$": "width" } }, "type": "object", "index$": 0 }, "key$": "images", "type": "array" }, "total": { "description": "Total number of images available", "key$": "total", "type": "integer" }, "page": { "description": "Current page number", "key$": "page", "type": "integer" }, "pageSize": { "description": "Number of items per page", "key$": "pageSize", "type": "integer" } } } } } }, "400": { "description": "Bad request - invalid parameters", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" } } } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" } } } } } } }, "parameters": [{ "name": "pageSize", "in": "query", "description": "Number of images to return per page", "required": false, "schema": { "type": "integer", "default": 30, "minimum": 1, "maximum": 100 }, "index$": 0 }, { "name": "page", "in": "query", "description": "Page number for pagination", "required": false, "schema": { "type": "integer", "default": 1, "minimum": 1 }, "index$": 1 }, { "name": "category", "in": "query", "description": "Filter images by category", "required": false, "schema": { "type": "string" }, "index$": 2 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let image_ref01_data = Object.values(setup.data.existing.image)[0];
        // LIST
        const image_ref01_ent = client.Image();
        const image_ref01_match = {};
        const image_ref01_list = (await image_ref01_ent.list(image_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/image/ImageTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WaifuimSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['image01', 'image02', 'image03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WAIFUIM_TEST_IMAGE_ENTID': idmap,
        'WAIFUIM_TEST_LIVE': 'FALSE',
        'WAIFUIM_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['WAIFUIM_TEST_IMAGE_ENTID'];
    const live = 'TRUE' === env.WAIFUIM_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WAIFUIM_TEST_IMAGE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.WaifuimSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.WAIFUIM_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ImageEntity.test.js.map