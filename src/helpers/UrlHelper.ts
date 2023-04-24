import endpoints from "../config/endpoints.json"
import { urlJoin } from 'url-join-ts';
import EnvHelper from './EnvHelper';


/* Данный класс генерирует URLы для преопредленных
 * в json-файле эндпоинтов.
 */
export default class UrlHelper {
    public static getHostUrl = () =>
        EnvHelper.usePredefinedHost()
            ? endpoints.backend.host
            : window.location.protocol + '//' + window.location.host;

    public static getApiBaseUrl = (): string => this.getApiBaseUrlForHost(undefined);

    public static getApiBaseUrlForHost = (host?: string): string => urlJoin(
        host ?? this.getHostUrl(),
        endpoints.backend.basePath);

    public static getPeersUrl = () => urlJoin(
        this.getApiBaseUrl(),
        endpoints.backend.peersControllerPath);

    public static getPeersUrlForHost = (host?: string) => urlJoin(
        this.getApiBaseUrlForHost(host),
        endpoints.backend.peersControllerPath);

    public static getStatusUrl = () => urlJoin(
        this.getApiBaseUrl(),
        endpoints.backend.statusControllerPath);

    public static getStatusUrlForHost = (host?: string) => urlJoin(
        this.getApiBaseUrlForHost(host),
        endpoints.backend.statusControllerPath);
}
