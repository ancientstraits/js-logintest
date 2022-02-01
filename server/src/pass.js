import sqlite3 from 'sqlite3'
import hash from './hash.js'

const dbfile = process.env['DBFILE'] || 'server/db/db.sqlite3'
const db = new sqlite3.Database(dbfile)
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users ( user TEXT, pass NUMBER )')
})

export const add = (user, pass) => {
    db.serialize(() => {
        db.run(`INSERT INTO users VALUES ('${user}', '${hash(pass)}')`)
    })
}
export const check = async(user, pass) => new Promise((resolve, reject) => {
    db.serialize(() => {
        db.get(`SELECT * FROM users WHERE user = '${user}'`, (err, row) => {
            if (err)
                reject(err)
            else
                resolve(hash(pass) == row.pass)
        })
    })
})
export const close = db.close

export default { add, check, close }