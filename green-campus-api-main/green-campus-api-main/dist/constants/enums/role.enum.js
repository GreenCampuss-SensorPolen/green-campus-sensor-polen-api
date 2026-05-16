"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleLabels = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["SENSOR"] = "SENSOR";
    Role["MANAGER"] = "MANAGER";
    Role["VIEWER"] = "VIEWER";
})(Role || (exports.Role = Role = {}));
exports.RoleLabels = {
    [Role.ADMIN]: 'DIRECTIVO',
    [Role.SENSOR]: 'SENSOR',
    [Role.MANAGER]: 'TECNICO',
    [Role.VIEWER]: 'SERVICIOS_GENERALES',
};
//# sourceMappingURL=role.enum.js.map