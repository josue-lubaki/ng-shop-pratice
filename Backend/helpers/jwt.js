const expressJwt = require('express-jwt')
const api = process.env.API_URL

function authJwt() {
    const secret = process.env.secret
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked, // SECURE : User Role
    }).unless({
        path: [
            {
                url: /\/public\/uploads(.*)/,
                methods: ['GET', 'OPTIONS'],
            },
            {
                url: /\/api\/v1\/products(.*)/,
                methods: ['GET', 'OPTIONS'],
            },
            {
                url: /\/api\/v1\/categories(.*)/,
                methods: ['GET', 'OPTIONS'],
            },
            {
                url: /\/api\/v1\/orders(.*)/,
                methods: ['POST', 'OPTIONS'],
            },
            `${api}/users/login`,
            `${api}/users/register`,
        ],
    })
}

/**
 * Methode qui permet de bloquer les autres actions (POST, DELETE, UPDATE) pour les Utilisateurs ayant un token dont
 * le champ "isAdmin" serait false. À présent, que les Utilisateurs étant admin:true peuvent (POST, DELETE, UPDATE)
 * @param {*} req
 * @param {*} payload  type de retour (ex: DATA)
 * @param {*} done(callback, reject)
 */
async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true)
    }

    done()
}

module.exports = authJwt
