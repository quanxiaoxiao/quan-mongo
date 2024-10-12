"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @typedef {Object} MongoOptions
 * @property {string} database
 * @property {string} [hostname='127.0.0.1']
 * @property {number} [port=27017]
 * @property {string} [username='']
 * @property {string} [password='']
 * @property {Function} [onRequest]
 * @property {Function} [onConnect]
 */
/**
 * @param {MongoOptions} options
 */
exports.default = ({ database, hostname = '127.0.0.1', port = 27017, username, password, onRequest, onConnect, }) => __awaiter(void 0, void 0, void 0, function* () {
    let uri;
    if (!database || database.trim() === '') {
        console.error('mongo database is not set');
        process.exit(1);
    }
    if (username && password) {
        uri = `mongodb://${username}:${password}@${hostname}:${port}/${database}`;
    }
    else {
        uri = `mongodb://${hostname}:${port}/${database}`;
    }
    if (onRequest) {
        yield onRequest(uri);
    }
    mongoose_1.default.set('strictQuery', false);
    yield mongoose_1.default.connect(uri);
    if (onConnect) {
        yield onConnect(uri);
    }
});
