import jwt from "jsonwebtoken"
import { User, connect } from "@/models";
import axios from "axios"


export default class API {
    constructor(req, res) {
        this.req = req
        this.res = res
        this.id = { _id: req.query._id }

        this.get = this.get.bind(this)
        this.post = this.post.bind(this)
        this.put = this.put.bind(this)
        this.delete = this.delete.bind(this)
        this.path = this.path.bind(this)
        this.all = this.all.bind(this)

        this.Send = this.Send.bind(this)

    }

    // Methods
    req = this.req
    res = this.res
    async #METHOD(method, auth, callback) {
        if (this.req.method === method) {
            await connect();

            if (auth) {
                if (typeof callback === "function") callback()
                else auth()
            }
        }
    }
    async get(auth, callback) {
        return this.#METHOD('GET', auth, callback)
    }
    async post(auth, callback) {
        return this.#METHOD('POST', auth, callback)
    }
    async put(auth, callback) {
        return this.#METHOD('PUT', auth, callback)
    }
    async delete(auth, callback) {
        return this.#METHOD('DELETE', auth, callback)
    }
    async path(auth, callback) {
        return this.#METHOD('PATCH', auth, callback)
    }
    async all(auth, callback) {
        return this.#METHOD('ALL', auth, callback)
    }

    // data manager
    id = this.id

    async Send(data, status = 200) {
        this.res.setHeader('Content-Type', 'application/json')
        this.res.setHeader('Access-Control-Allow-Origin', "*")
        this.res.setHeader('Access-Control-Allow-Credentials', true);
        this.res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        this.res.setHeader('X-Content-Type-Options', 'nosniff');
        this.res.setHeader('X-Frame-Options', 'DENY');
        this.res.setHeader('X-XSS-Protection', '1; mode=block');
        this.res.setHeader('Content-Security-Policy', "default-src 'self'"); // تعديل القيم حسب احتياجاتك
        this.res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        this.res.setHeader('Referrer-Policy', 'no-referrer');

        this.res.status(status).json(data)

    }
}

export async function AuthServerSide(ctx, fun) {
    async function Auth(token) {
        if (token) {
            let URLs = `${process.env.NEXT_PUBLIC_API}/auth`
            let config = { headers: { token } }
            return axios.get(URLs, config)
                .then(({ data }) => (data))
        }
        else return false
    }
    function SSRctx(ctx) {
        let { cookies } = ctx.req
        let query = ctx.query
        let { token } = cookies
        let config = { headers: { token: cookies?.token, } }
        return { cookies, token, query, config }
    }
    let redirect = () => ({ redirect: { permanent: false, destination: '/auth/login' } })


    let { NEXT_PUBLIC_API } = process.env
    let { cookies, query, config, token } = SSRctx(ctx)

    if (!token) return redirect()
    else {
        let { auth } = await Auth(token)
        if (auth === false) return redirect()
        else {
            try {
                if (typeof fun === 'function') {
                    let data = await fun({ cookies, query, config, NEXT_PUBLIC_API })
                    return { props: { ...data, config } }
                }
            } catch (err) { return redirect() }
        }
    }
}