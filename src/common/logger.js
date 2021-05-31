"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pino_1 = __importDefault(require("pino"));
var getInstance = function (config) {
    var instance = pino_1.default({
        prettyPrint: {
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            colorize: true,
            ignore: 'pid,hostname',
            messageFormat: '{msg}'
        },
        level: 'debug'
    });
    return instance.child(config);
};
var Logger = {
    getInstance: getInstance
};
exports.default = Logger;
