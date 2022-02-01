import crypto from 'crypto'

export default data =>
    crypto
    .createHash('sha512')
    .update(data, 'utf-8')
    .digest('hex')