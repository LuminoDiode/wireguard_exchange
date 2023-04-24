export default interface NodeInfo {
    Id: number;
    Name: string;
    IpAddress: string;
    TlsUri:string;
    WireguardPort: number;
    ApiTlsPort: number;
    ApiPort: number;
}