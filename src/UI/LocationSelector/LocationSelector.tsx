import { useState } from "react";
import NodeInfo from "src/models/NodeInfo";
import cl from "./LocationSelector.module.css";

export interface ILocationSelector {
    onSelectionChanged: (node: NodeInfo) => void;
    locationsList: Array<NodeInfo>;
}


const LocationSelector: React.FC<ILocationSelector> = (props) => {
    const [selectedIndex, setIndex] = useState(0);

    const onSelect = (id: number) => {
        setIndex(id);
        props.onSelectionChanged(props.locationsList[id]);
    }
    
    return (<span className={cl.wrapper}>
        {
            props.locationsList.map((loc) =>
                <button
                    key={loc.Id}
                    className={[cl.button,
                        loc.Id === selectedIndex ? cl.buttonSelected : cl.buttonUnselected]
                    .join(' ')}
                    onClick={() => onSelect(loc.Id)}
                >
                    {loc.Name}
                </button>
            )
        }
    </span>);
}

export default LocationSelector;