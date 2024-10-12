declare function _default({ database, hostname, port, username, password, onRequest, onConnect, }: MongoOptions): Promise<void>;
export default _default;
export type MongoOptions = {
    database: string;
    hostname?: string | undefined;
    port?: number | undefined;
    username?: string | undefined;
    password?: string | undefined;
    onRequest?: Function | undefined;
    onConnect?: Function | undefined;
};
