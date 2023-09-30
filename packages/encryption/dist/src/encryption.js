"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hash = exports.decrypt = exports.encrypt = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
function encrypt(note, secretKey, noteIdHash) {
    const encryptedNote = crypto_js_1.default.AES.encrypt(String(note + noteIdHash), secretKey).toString();
    return encryptedNote;
}
exports.encrypt = encrypt;
function decrypt(encryptedNote, secretKey, noteIdHash) {
    let decryptedContent = '';
    let decryptedNote = '';
    const decryptErrorMessage = 'Could not decrypt';
    try {
        decryptedContent = crypto_js_1.default.AES.decrypt(encryptedNote, secretKey).toString(crypto_js_1.default.enc.Utf8);
        if (decryptedContent.endsWith(noteIdHash)) {
            decryptedNote = decryptedContent.substring(0, decryptedContent.length - noteIdHash.length);
            return {
                decryptedNote,
            };
        }
    }
    catch (err) {
        return {
            decryptedNote: null,
            message: decryptErrorMessage,
        };
    }
    return {
        decryptedNote: null,
        message: decryptErrorMessage,
    };
}
exports.decrypt = decrypt;
function hash(payload) {
    return crypto_js_1.default.SHA512(payload).toString();
}
exports.hash = hash;
