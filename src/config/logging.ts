const getTimeISOString = (): string => {
    return new Date().toISOString();
};

const debug = (namespace: string, msg: string, obj?: any) => {
    if (obj) {
        console.debug(`[${getTimeISOString()}] DEBUG INFO [${namespace}] ${msg}`, obj);
    } else {
        console.debug(`[${getTimeISOString()}] DEBUG INFO [${namespace}] ${msg}`);
    }
};

const info = (namespace: string, msg: string, obj?: any) => {
    if (obj) {
        console.info(`[${getTimeISOString()}] INFORMATION [${namespace}] ${msg}`, obj);
    } else {
        console.info(`[${getTimeISOString()}] INFORMATION [${namespace}] ${msg}`);
    }
};

const error = (namespace: string, msg: string, obj?: any) => {
    if (obj) {
        console.error(`[${getTimeISOString()}] ERROR INFO [${namespace}] ${msg}`, obj);
    } else {
        console.error(`[${getTimeISOString()}] ERROR INFO [${namespace}] ${msg}`);
    }
};

const warn = (namespace: string, msg: string, obj?: any) => {
    if (obj) {
        console.warn(`[${getTimeISOString()}] WARNING [${namespace}] ${msg}`, obj);
    } else {
        console.warn(`[${getTimeISOString()}] WARNING [${namespace}] ${msg}`);
    }
};

export default {
    info,
    warn,
    error,
    debug
};