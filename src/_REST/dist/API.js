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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.API = exports.API_ = void 0;
var all_1 = require("@pnp/sp/presets/all");
var sp_1 = require("@pnp/sp");
// Config
var config_1 = require("./config");
var SP = all_1.Web(config_1.SP_ROOT_URL).configure({ headers: config_1.headers });
var SPLists = SP.lists;
// const filterServices = async () => {
//   const res = await SPLists.getById(GuidList.BP02ProductServices).items.filter(`ContentType eq '0x0100E03BE5D98FC3417B84A28F834BEAB5AD0203'`).get();
//   console.log(`res`, res);
// };
// filterServices();
// const filterAppointments = async () => {
//   const res = await SPLists.getById(GuidList.Appointment).items.filter(`ContentType eq '0x0100E03BE5D98FC3417B84A28F834BEAB5AD0203'`).get();
//   console.log(`res`, res);
// };
// filterAppointments();
var getSPData = function (listGuid, select, orderBy, filter) {
    if (filter === void 0) { filter = ''; }
    return SPLists.getById(listGuid)
        .items.top(99999)
        .filter(filter)
        .select(select)
        .orderBy(orderBy)
        .get()
        .then(function (response) { return response; });
};
var createSPDataItem = function (listGuid, selectFields, _a) {
    var ID = _a.ID, Id = _a.Id, newDataItem = __rest(_a, ["ID", "Id"]);
    return SPLists.getById(listGuid)
        .items.add(newDataItem)
        .then(function (res) {
        return res.item
            .select(selectFields)
            .get()
            .then(function (newServerDataItem) { return newServerDataItem; });
    });
};
var updateSPDataItem = function (listGuid, selectFields, dataItem) {
    return SPLists.getById(listGuid)
        .items.getById(dataItem.ID)
        .update(dataItem)
        .then(function (res) {
        return res.item
            .select(selectFields)
            .get()
            .then(function (res) { return res; });
    });
};
var deleteSPDataItem = function (listGuid, dataItemID) {
    return SPLists.getById(listGuid)
        .items.getById(dataItemID)["delete"]()
        .then(function () { return dataItemID; });
};
exports.API_ = {
    agenda: {
        getData: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, getSPData(config_1.GuidList.Appointment, config_1.SelectFields.Appointment, config_1.OrderBy.Appointment, config_1.FilterItems.Appointments)];
        }); }); },
        createDataItem: function (createdDataItem) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, createSPDataItem(config_1.GuidList.Appointment, config_1.SelectFields.Appointment, createdDataItem)];
        }); }); },
        updateDataItem: function (updatedDataItem) {
            return updateSPDataItem(config_1.GuidList.Appointment, config_1.SelectFields.Appointment, updatedDataItem);
        },
        deleteDataItem: function (deletedDataItemID) { return deleteSPDataItem(config_1.GuidList.Appointment, deletedDataItemID); }
    },
    customers: {
        getData: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, getSPData(config_1.GuidList.Customer, config_1.SelectFields.Customer, config_1.OrderBy.Customer)];
        }); }); },
        createDataItem: function (createdDataItem) {
            return createSPDataItem(config_1.GuidList.Customer, config_1.SelectFields.Customer, createdDataItem);
        },
        updateDataItem: function (updatedDataItem) {
            return updateSPDataItem(config_1.GuidList.Customer, config_1.SelectFields.Customer, updatedDataItem);
        },
        deleteDataItem: function (deletedDataItemID) { return deleteSPDataItem(config_1.GuidList.Customer, deletedDataItemID); }
    },
    staff: {
        getData: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, getSPData(config_1.GuidList.Staff, config_1.SelectFields.Staff, config_1.OrderBy.Staff)];
        }); }); },
        createDataItem: function (createdDataItem) {
            return createSPDataItem(config_1.GuidList.Staff, config_1.SelectFields.Staff, createdDataItem);
        },
        updateDataItem: function (updatedDataItem) {
            return updateSPDataItem(config_1.GuidList.Staff, config_1.SelectFields.Staff, updatedDataItem);
        },
        deleteDataItem: function (deletedDataItemID) { return deleteSPDataItem(config_1.GuidList.Staff, deletedDataItemID); }
    },
    services: {
        getData: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, getSPData(config_1.GuidList.Service, config_1.SelectFields.Service, config_1.OrderBy.Service)];
        }); }); },
        createDataItem: function (createdDataItem) {
            return createSPDataItem(config_1.GuidList.Service, config_1.SelectFields.Service, createdDataItem);
        },
        updateDataItem: function (updatedDataItem) {
            return updateSPDataItem(config_1.GuidList.Service, config_1.SelectFields.Service, updatedDataItem);
        },
        deleteDataItem: function (deletedDataItemID) { return deleteSPDataItem(config_1.GuidList.Service, deletedDataItemID); }
    },
    user: {
        getPermissions: function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, sp_1.sp
                        .configure({ headers: config_1.headers }, config_1.SP_ROOT_URL)
                        .web.configure({ headers: config_1.headers })
                        .getCurrentUserEffectivePermissions()
                        .then(function (response) { return response; })];
            });
        }); }
    }
};
exports.API = {
    agenda: {
        getData: function () { return fetch(config_1.ROOT_URL + "/appointments").then(function (response) { return response.json(); }); },
        createDataItem: function (createdDataItem) {
            return fetch(config_1.ROOT_URL + "/appointments", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createdDataItem)
            }).then(function (response) { return response.json(); });
        },
        updateDataItem: function (updatedDataItem) {
            return fetch(config_1.ROOT_URL + "/appointments/" + updatedDataItem.ID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedDataItem)
            }).then(function (response) { return response.json(); });
        },
        deleteDataItem: function (deletedDataItemID) {
            return fetch(config_1.ROOT_URL + "/appointments/" + deletedDataItemID, {
                method: 'DELETE'
            }).then(function (response) { return response.json(); });
        }
    },
    customers: {
        getData: function () { return fetch(config_1.ROOT_URL + "/customers").then(function (response) { return response.json(); }); },
        createDataItem: function (createdDataItem) {
            return fetch(config_1.ROOT_URL + "/customers", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createdDataItem)
            }).then(function (response) { return response.json(); });
        },
        updateDataItem: function (updatedDataItem) {
            return fetch(config_1.ROOT_URL + "/customers/" + updatedDataItem.ID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedDataItem)
            }).then(function (response) { return response.json(); });
        },
        deleteDataItem: function (deletedDataItemID) {
            return fetch(config_1.ROOT_URL + "/customers/" + deletedDataItemID, {
                method: 'DELETE'
            }).then(function (response) { return response.json(); });
        }
    },
    staff: {
        getData: function () { return fetch(config_1.ROOT_URL + "/staff").then(function (response) { return response.json(); }); },
        createDataItem: function (createdDataItem) {
            return fetch(config_1.ROOT_URL + "/staff", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createdDataItem)
            }).then(function (response) { return response.json(); });
        },
        updateDataItem: function (updatedDataItem) {
            return fetch(config_1.ROOT_URL + "/staff/" + updatedDataItem.ID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedDataItem)
            }).then(function (response) { return response.json(); });
        },
        deleteDataItem: function (deletedDataItemID) {
            return fetch(config_1.ROOT_URL + "/staff/" + deletedDataItemID, {
                method: 'DELETE'
            }).then(function (response) { return response.json(); });
        }
    },
    services: {
        getData: function () { return fetch(config_1.ROOT_URL + "/services").then(function (response) { return response.json(); }); },
        createDataItem: function (createdDataItem) {
            return fetch(config_1.ROOT_URL + "/services", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(createdDataItem)
            }).then(function (response) { return response.json(); });
        },
        updateDataItem: function (updatedDataItem) {
            return fetch(config_1.ROOT_URL + "/services/" + updatedDataItem.ID, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedDataItem)
            }).then(function (response) { return response.json(); });
        },
        deleteDataItem: function (deletedDataItemID) {
            return fetch(config_1.ROOT_URL + "/services/" + deletedDataItemID, {
                method: 'DELETE'
            }).then(function (response) { return response.json(); });
        }
    },
    user: {
        getPermissions: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, fetch(config_1.ROOT_URL + "/permissions").then(function (response) { return response.json(); })];
        }); }); }
    }
};
