import pino from 'pino';

const getInstance = (config: { name: string }): any => {
    const instance: pino.Logger = pino({
        prettyPrint: {
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            colorize: true,
            ignore: 'pid,hostname',
            messageFormat: '{msg}'
        },
        level: 'debug'
    });
    return instance.child(config);
};

const Logger = {
    getInstance
};

export default Logger;
