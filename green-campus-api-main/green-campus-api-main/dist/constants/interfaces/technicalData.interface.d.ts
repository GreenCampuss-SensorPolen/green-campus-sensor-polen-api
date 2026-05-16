export interface Telemetry {
    temperature: number | null;
    humidity: number | null;
    co2: number | null;
    energy: number | null;
}
export interface IotNode {
    id: string;
    name: string;
    type: string;
    status: 'ONLINE' | 'OFFLINE' | 'STANDBY';
    battery: number;
    location: string;
    edificio: string;
    planta: string;
    lastTelemetry?: Telemetry;
}
