"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var EventSvc = __importStar(require("./services"));
var Router = express_1.default.Router();
/**
 * Get all events
 * GET events
 */
Router.get('/', function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var events, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, EventSvc.findAll()];
            case 1:
                events = _a.sent();
                res.status(200).send(events);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).send(error_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Get example event
 * GET events/:id
 */
Router.get('/example', function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var events, exampleEvent, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, EventSvc.findAll()];
            case 1:
                events = _a.sent();
                exampleEvent = events.find(function (event) { return event.example; });
                if (exampleEvent) {
                    return [2 /*return*/, res.status(200).send(exampleEvent)];
                }
                return [2 /*return*/, res.status(404).send('Example event not found')];
            case 2:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(500).send(error_2.message)];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Get event by Id
 * GET events/:id
 */
Router.get('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, event_1, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, EventSvc.find(id)];
            case 2:
                event_1 = _a.sent();
                if (event_1) {
                    return [2 /*return*/, res.status(200).send(event_1)];
                }
                return [2 /*return*/, res.status(404).send("event [" + id + "] not found")];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, res.status(500).send(error_3.message)];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * Create event
 * POST events
 */
Router.post('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var event_2, newEvent, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                event_2 = req.body;
                return [4 /*yield*/, EventSvc.create(event_2)];
            case 1:
                newEvent = _a.sent();
                res.status(201).json(newEvent);
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                res.status(500).send(error_4.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * Update event
 * PUT events/:id
 */
Router.put('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, eventUpdate, existingEvent, updatedEvent, newEvent, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                eventUpdate = req.body;
                return [4 /*yield*/, EventSvc.find(id)];
            case 2:
                existingEvent = _a.sent();
                if (!existingEvent) return [3 /*break*/, 4];
                return [4 /*yield*/, EventSvc.update(id, eventUpdate)];
            case 3:
                updatedEvent = _a.sent();
                return [2 /*return*/, res.status(200).json(updatedEvent)];
            case 4: return [4 /*yield*/, EventSvc.create(eventUpdate)];
            case 5:
                newEvent = _a.sent();
                return [2 /*return*/, res.status(201).json(newEvent)];
            case 6:
                error_5 = _a.sent();
                return [2 /*return*/, res.status(500).send(error_5.message)];
            case 7: return [2 /*return*/];
        }
    });
}); });
/**
 * Delete event
 * DELETE events/:id
 */
Router.delete('/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, EventSvc.remove(id)];
            case 1:
                _a.sent();
                res.sendStatus(204);
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(500).send(error_6.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = Router;
