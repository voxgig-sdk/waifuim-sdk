"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'Waifuim',
        slug: "waifuim",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.waifu.im",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            artist: {},
            image: {},
        }
    };
    entity = {
        "artist": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier for the artist"
                },
                {
                    "name": "name",
                    "title": "Name",
                    "type": "`$STRING`",
                    "short": "Name of the artist"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "short": "URL to the artist's profile or portfolio",
                    "format": "uri"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "artist",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/artists",
                            "segments": [
                                {
                                    "lit": "artists"
                                }
                            ],
                            "parts": [
                                "artists"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.artists`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "page_size",
                                        "orig": "page_size",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 100
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "page",
                                    "page_size"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "image": {
            "fields": [
                {
                    "name": "artist",
                    "title": "Artist",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "category",
                    "title": "Category",
                    "type": "`$STRING`",
                    "short": "Category of the image"
                },
                {
                    "name": "height",
                    "title": "Height",
                    "type": "`$INTEGER`",
                    "short": "Image height in pixels"
                },
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`",
                    "short": "Unique identifier for the image"
                },
                {
                    "name": "thumbnail",
                    "title": "Thumbnail",
                    "type": "`$STRING`",
                    "short": "URL to the thumbnail version of the image",
                    "format": "uri"
                },
                {
                    "name": "url",
                    "title": "Url",
                    "type": "`$STRING`",
                    "short": "URL to the image",
                    "format": "uri"
                },
                {
                    "name": "width",
                    "title": "Width",
                    "type": "`$INTEGER`",
                    "short": "Image width in pixels"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "image",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/images",
                            "segments": [
                                {
                                    "lit": "images"
                                }
                            ],
                            "parts": [
                                "images"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.images`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "category",
                                        "orig": "category",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 1
                                    },
                                    {
                                        "name": "page_size",
                                        "orig": "page_size",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 30
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "category",
                                    "page",
                                    "page_size"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map