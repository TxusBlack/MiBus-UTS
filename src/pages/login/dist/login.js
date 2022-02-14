"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.__esModule = true;
exports.LoginPage = void 0;
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var firebase = require("firebase");
require("firebase/firestore");
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, platform, device, toastCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.device = device;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.isActive = false;
    }
    LoginPage.prototype.goToPage = function (page) {
        this.navCtrl.setRoot(page);
    };
    LoginPage.prototype.getNewData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                alert = this.alertCtrl.create({
                    title: 'Hace falta información',
                    subTitle: "¿Cuál es su nombre?",
                    inputs: [
                        {
                            name: 'name',
                            placeholder: 'Nombre'
                        },
                    ],
                    buttons: [
                        {
                            text: 'Guardar',
                            handler: function (data) {
                                console.log('data clicked', data.name);
                                var fb = firebase.firestore();
                                fb.collection('usuarios').doc(_this.uuid).update({
                                    name: data.name
                                }).then(function () { return _this.goToPage('DriverPage'); });
                            }
                        },
                    ]
                });
                alert.present();
                return [2 /*return*/];
            });
        });
    };
    LoginPage.prototype.setDocumentDriver = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fb, snapshot, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fb = firebase.firestore();
                        return [4 /*yield*/, fb.collection('usuarios').doc(this.uuid).get()];
                    case 1:
                        snapshot = _a.sent();
                        if (!!snapshot.exists) return [3 /*break*/, 3];
                        return [4 /*yield*/, fb.collection('usuarios').doc(this.uuid).set({
                                uuid: this.uuid,
                                isActive: true
                            })];
                    case 2:
                        _a.sent();
                        this.getNewData();
                        _a.label = 3;
                    case 3:
                        user = snapshot.data();
                        if (!user.name) {
                            this.getNewData();
                        }
                        else {
                            return [2 /*return*/, this.goToPage('DriverPage')];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.checkLiscence = function () {
        return __awaiter(this, void 0, void 0, function () {
            var fb, snapshot, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fb = firebase.firestore();
                        return [4 /*yield*/, fb.collection('config').doc("1").get()];
                    case 1:
                        snapshot = _a.sent();
                        config = snapshot.data();
                        this.isActive = config.isActive;
                        if (!config.isActive) {
                            return [2 /*return*/, alert("La licencia de la app no está activa")];
                        }
                        else {
                            return [2 /*return*/, this.toastCtrl.create({
                                    message: "La licencia de la app ha sido configurada exitosamente",
                                    duration: 1000
                                }).present()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.ionViewDidLoad = function () {
        this.checkLiscence();
        if (this.platform.is('cordova')) {
            this.uuid = this.device.uuid;
            console.log('uuid', this.uuid);
        }
        else {
            this.uuid = '123';
        }
    };
    LoginPage = __decorate([
        ionic_angular_1.IonicPage(),
        core_1.Component({
            selector: 'page-login',
            templateUrl: 'login.html'
        })
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
