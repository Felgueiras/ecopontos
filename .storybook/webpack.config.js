
module.exports = (baseConfig, env, defaultConfig) => {

    defaultConfig.externals = {
        Config: JSON.stringify({
            serverUrl: "hysmart.rethink.ptinovacao.pt",
            rethinkUrl: 'https://hysmart.rethink.ptinovacao.pt/.well-known/runtime/rethink.js'
        }
        )
    }




    return defaultConfig;
};