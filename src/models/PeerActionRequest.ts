export default class PeerActionRequest {
    publicKey: string;

    constructor(pubkey: string) {
        this.publicKey = pubkey;
    }
}