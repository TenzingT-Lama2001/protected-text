"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_js_1 = __importDefault(require("crypto-js"));
const encryption_1 = require("../encryption");
describe('EncryptionService', () => {
    describe('encrypt', () => {
        it('should encrypt the note', () => {
            const note = 'myNote';
            const secretKey = 'mySecret123';
            const noteIdHash = 'myNoteIdHash';
            const encryptSpy = jest.spyOn(crypto_js_1.default.AES, 'encrypt');
            (0, encryption_1.encrypt)(note, secretKey, noteIdHash);
            expect(encryptSpy).toHaveBeenCalledWith(String(note + noteIdHash), secretKey);
        });
    });
    describe('decrypt', () => {
        const encryptedNote = 'U2FsdGVkX18tAvBzjm9VJwtd+lvBN6guf9buNRjxdM4z6CI2DSazHNGjFIz+09XSRHF/ayBj1K1g992pJgf3mrl/J6xEhT4lacBG/PVN10XfuRFTG1PZIxMG2DlZ0njN4pc9E1nDKTqmkJGZKntUtBn2g/OlZWwMjb4gOUZ1yTwGWaGH3Wj2ec2bQ9rIc684ld8VlbpdKR8Bkkxj8Mu26Yu9nzEiv1FoYoEB5yTaK0U=';
        const secretKey = 'secret123';
        const noteIdHash = '500dd4bb96f6774e8f26c519b77a19872e387af45b715b604a0cef5ff1f8f667a234605f5308d95c4ca83f8f13f790bc4a06732edf2e098ffb92c693b319a8dd';
        const decryptSpy = jest.spyOn(crypto_js_1.default.AES, 'decrypt');
        it('should decrypt the note and return it if decryptedContent ends with noteIdHash', async () => {
            const decryptedNote = 'latest note for site';
            const result = (0, encryption_1.decrypt)(encryptedNote, secretKey, noteIdHash);
            expect(decryptSpy).toHaveBeenCalledWith(encryptedNote, secretKey);
            expect(result).toEqual({ decryptedNote });
        });
        it('should return null if decryptedContent does not end with noteIdHash', () => {
            const invalidEncryptedNote = 'myEncryptedNote';
            const result = (0, encryption_1.decrypt)(invalidEncryptedNote, secretKey, noteIdHash);
            expect(decryptSpy).toHaveBeenCalledWith(invalidEncryptedNote, secretKey);
            expect(result).toEqual({ decryptedNote: null, message: 'Could not decrypt' });
        });
        it('should return decryptedNote as null and error message if secret key does not match', () => {
            const invalidSecretKey = 'secret1234';
            const errorMessage = 'Malformed UTF-8 data';
            let result = {
                decryptedNote: null,
            };
            try {
                result = (0, encryption_1.decrypt)(encryptedNote, invalidSecretKey, noteIdHash);
            }
            catch (err) {
                const error = err;
                expect(error.message).toEqual(errorMessage);
                expect(decryptSpy).toHaveBeenCalledWith(encryptedNote, invalidSecretKey);
                expect(result).toEqual({
                    decryptedNote: null,
                    message: errorMessage,
                });
            }
        });
    });
    describe('hash', () => {
        const payload = 'site';
        const hashSpy = jest.spyOn(crypto_js_1.default, 'SHA512');
        const result = (0, encryption_1.hash)(payload);
        expect(hashSpy).toHaveBeenCalledWith(payload);
        expect(result).toBe('500dd4bb96f6774e8f26c519b77a19872e387af45b715b604a0cef5ff1f8f667a234605f5308d95c4ca83f8f13f790bc4a06732edf2e098ffb92c693b319a8dd');
    });
});
