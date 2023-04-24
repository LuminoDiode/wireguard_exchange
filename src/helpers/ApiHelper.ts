import axios from "axios";
import UrlHelper from "./UrlHelper";
import NodeInfo from 'src/models/NodeInfo';
import PeerActionRequest from '../models/PeerActionRequest';
import AddPeerResponse from '../models/AddPeerResponse';
import ConfigHelper from './ConfigHelper';
import { urlJoin } from 'url-join-ts';

export default class ApiHelper {
    private static GetNodeUrl = (node: NodeInfo) => {
        return `http://${node.IpAddress}:${node.ApiPort}`;
    }
    private static GetNodeUrlTls = (node: NodeInfo) => {
        return urlJoin(
            UrlHelper.getHostUrl(),
            node.TlsUri);
    }

    private static isOkStatus = (code: number) => {
        return code >= 200 && code <= 299;
    }

    public static CheckStatus = async (node: NodeInfo) => {
        const url = UrlHelper.getStatusUrlForHost(this.GetNodeUrl(node));
        const result = await axios.get(url);
        const isOk = this.isOkStatus(result.status);

        console.log(`Node \'${node.Name}\' status: ${isOk ? "OK" : "NOT REACHABLE"}.`);
        return isOk;
    }

    // public static PushPublicKey = async (node: NodeInfo, pubkey: string) => {
    //     const url = UrlHelper.getPeersUrlForHost(this.GetNodeUrl(node));
    //     const result = await axios.put<AddPeerResponse>(url, new PeerActionRequest(pubkey));
    //     let isOk = this.isOkStatus(result.status);

    //     console.log(`Node \'${node.Name}\' peer adding result: ${isOk ? "OK" : "PROBLEM"}.`);
    //     return isOk ? result.data : undefined;
    // }

    public static PushPublicKeyAndCreateConfig = async (node: NodeInfo, pubkey: string) => {
        const request = new PeerActionRequest(pubkey);
        let url = this.GetNodeUrlTls(node);

        try {
            var response = await axios.put<AddPeerResponse>(url, request);
        }
        catch {     
            return undefined;
            // console.log("Unable to reach node with TLS-connection. Trying to send data via HTTP. No sensitive data will be exposed.");
            // url = UrlHelper.getPeersUrlForHost(this.GetNodeUrl(node));
            // var response = await axios.put<AddPeerResponse>(url, request);
        }

        let isOk = this.isOkStatus(response.status);
        console.log(`Node \'${node.Name}\' peer adding result: ${isOk ? "OK" : "PROBLEM"}.`);

        return isOk ? ConfigHelper.Create(node, request, response.data) : undefined;
    }
}