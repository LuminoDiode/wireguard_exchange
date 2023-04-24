import cl from "./ExchangeHeader.module.css";

const ExchangeHeader: React.FC = () => {
    return (<header className={cl.header}>
        <span className={cl.title}>
            <strong>
                wireguard-exchange
            </strong>
            <br/>
            <span className={cl.subtitle}>
                .bruhcontent.ru
            </span>
        </span>
        <span className={cl.description}>
            This is the demonstation config <a href="https://github.com/LuminoDiode/wireguard_exchange">
            generator</a> for <a href="https://github.com/LuminoDiode/rest2wireguard">
                rest2wg
            </a> WebAPI-managed
            wireguard server.
            You can choose one of the locations for your public key to be added to.
        </span>
    </header>);
}

export default ExchangeHeader;