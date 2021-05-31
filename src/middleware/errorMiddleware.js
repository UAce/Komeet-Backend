"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
var logger_1 = __importDefault(require("../common/logger"));
var logger = logger_1.default.getInstance({ name: __filename });
var errorHandler = function (error, _request, response, _next) {
    var status = error.statusCode || error.status || 500;
    response.status(status).send(error);
};
exports.errorHandler = errorHandler;
var notFoundHandler = function (request, response, _next) {
    var message = "Requested path '" + request.path + "' not found\n";
    logger.error(message);
    response.status(404).send(message);
};
exports.notFoundHandler = notFoundHandler;
