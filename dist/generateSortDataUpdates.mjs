"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-expect-error
const http_errors_1 = __importDefault(require("http-errors"));
const isValidObjectId_mjs_1 = __importDefault(require("./isValidObjectId.mjs"));
/**
 * @typedef {Object} Item
 * @property {Object|string} _id
 */
/**
 * @param {Array<Item>} arr
 * @param {Array<string>} input
 * @returns {Array<Object>}
 */
exports.default = (arr, input) => {
    const len = input.length;
    if (len !== input.length) {
        throw (0, http_errors_1.default)(400);
    }
    const updates = [];
    for (let i = 0; i < len; i++) {
        const target = input[i];
        if (!(0, isValidObjectId_mjs_1.default)(target)) {
            throw (0, http_errors_1.default)(400);
        }
        if (!arr.some((d) => d._id.toString() === target)) {
            throw (0, http_errors_1.default)(400);
        }
        updates.push({
            updateOne: {
                filter: {
                    _id: target,
                    invalid: {
                        $ne: true,
                    },
                },
                update: {
                    $set: {
                        order: len - i,
                    },
                },
            },
        });
    }
    return updates;
};
