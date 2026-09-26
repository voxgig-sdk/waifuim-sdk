"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaifuimError = void 0;
class WaifuimError extends Error {
    isWaifuimError = true;
    sdk = 'Waifuim';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.WaifuimError = WaifuimError;
//# sourceMappingURL=WaifuimError.js.map