import type { FtpConfig } from './types.d'
const userConfig: FtpConfig = {
    user: '',
    password: '',
    test: '',
    production: '',
    host: '',
    port: 2021,
    localRoot: path.resolve(__dirname, `../dist`),
    remoteRoot: '/test'
}

module.exports = userConfig