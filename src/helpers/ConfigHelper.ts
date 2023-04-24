import PeerActionRequest from '../models/PeerActionRequest';
import AddPeerResponse from '../models/AddPeerResponse';
import NodeInfo from '../models/NodeInfo';
export default class ConfigHelper {
    public static Create = (node: NodeInfo, request: PeerActionRequest, response: AddPeerResponse) => {
        const result = [
            `[Interface]`,
            `PrivateKey = INSERT_YOUR_PRIVATE_KEY_HERE`,
            `Address = ${response.allowedIps}`,
            `DNS = 8.8.8.8`,
            ``,
            `[Peer]`,
            `PublicKey = ${response.interfacePublicKey}`,
            `AllowedIPs = 0.0.0.0/0`,
            `Endpoint = ${node.IpAddress}:${node.WireguardPort}`];

        return result.join("\r\n");
    }
}