export enum Role {
  ADMIN = 'ADMIN',
  SENSOR = 'SENSOR',
  MANAGER = 'MANAGER',
  VIEWER = 'VIEWER',
}

export const RoleLabels: Record<Role, string> = {
  [Role.ADMIN]: 'DIRECTIVO',
  [Role.SENSOR]: 'SENSOR',
  [Role.MANAGER]: 'TECNICO',
  [Role.VIEWER]: 'SERVICIOS_GENERALES',
};
