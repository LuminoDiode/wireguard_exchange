import { useState } from "react";
import NodeInfo from "src/models/NodeInfo";
import LocationSelector from "../LocationSelector/LocationSelector";
import cl from "./ConfigGenerator.module.css";
import ApiHelper from "src/helpers/ApiHelper";
import { Buffer } from 'buffer';

export interface IConfigGenerator {
    locationsList: Array<NodeInfo>;
}

const ConfigGenerator: React.FC<IConfigGenerator> = (props) => {
    const locs = props.locationsList;
    const [location, setLocation] = useState<NodeInfo>(locs[0] ?? undefined);
    const [pubkey, setPubkey] = useState("");
    const [privkey, setPrivkey] = useState("");
    const [config, setConfig] = useState("");
    const [buttonEnabled, setButtonEnabled] = useState(true);
    const onGenerationRequired = async () => {
        setConfig("");
        setButtonEnabled(false);
        setTimeout(() => setButtonEnabled(true), 5000);
        console.log(`Requesting \'${location!.Name}\' node...`);

        if (pubkey.length > 1024 ||
            Buffer.from(pubkey, "base64").length !== (256 / 8) // wg pubkey is 256 bits long
        ) {
            setConfig("Provided public key is not valid wireguard 256-bits long key.");
            setButtonEnabled(true);
            return;
        }

        var result = await ApiHelper.PushPublicKeyAndCreateConfig(location, pubkey.trim());

        if (result === undefined || result === null || !result) {
            setConfig("There was a problem with pushing your key.");
            return;
        }

        try {
            if (Buffer.from(privkey, "base64").length === (256 / 8)) {
                result = result.replace("INSERT_YOUR_PRIVATE_KEY_HERE", privkey.trim());
            }
        } catch { }


        setConfig(result);
        setButtonEnabled(true);
    }

    if (props.locationsList.length < 1)
        return (<span className={cl.wrapper}>There is no locations currently available.</span>);

    return (<span className={cl.wrapper}>
        <LocationSelector onSelectionChanged={setLocation} locationsList={locs} />
        <input placeholder="your public key" className={cl.pubkeyInput} onChange={e => setPubkey(e.target.value)} value={pubkey} />
        <input placeholder="your private key (optional)" className={cl.pubkeyInput} onChange={e => setPrivkey(e.target.value)} value={privkey} />
        <button className={cl.generateButton} onClick={onGenerationRequired} disabled={!buttonEnabled}>get configuration</button>
        <textarea value={config} onChange={e => setConfig(e.target.value)} className={cl.configOutput} rows={10}>

        </textarea>
    </span>);
}

export default ConfigGenerator;