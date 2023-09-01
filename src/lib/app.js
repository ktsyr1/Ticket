import jwt from "jsonwebtoken"
import Cookies from "js-cookie";
import { User, connect } from "@/models";

export function ITS(image) {
        let res = ""
        if (image.length > 0) {
                const reader = new FileReader();
                reader.onloadend = () => res = reader.result
                reader.readAsDataURL(image[0]);
        } else res = "/images/no-image.png"
        return res
}
export function setChange(e, data, set) {
        let full_data = { ...data }
        let object = e.target.attributes?.object?.value

        if (object) {

                let el = { [e.target.name]: e.target.value }
                full_data[object] = { ...full_data[object] };
                Object.assign(full_data[object], el)

        } else full_data[e.target.name] = e.target.value

        return set(full_data)
}

export function Input(props) {
        return (
                <div className={`box col ${props.className}`}>
                        <p>{props.title}</p>
                        <input type={props?.title ? props?.title : 'text'} {...props} />
                </div>
        )
}

export class API {
        constructor(req, res) {
                this.req = req
                this.res = res
                this.id = { _id: req.query._id }

                this.GET = this.GET.bind(this)
                this.POST = this.POST.bind(this)
                this.PUT = this.PUT.bind(this)
                this.DELETE = this.DELETE.bind(this)
                this.PATCH = this.PATCH.bind(this)
                this.ALL = this.ALL.bind(this)

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
        async GET(auth, callback) {
                return this.#METHOD('GET', auth, callback)
        }
        async POST(auth, callback) {
                return this.#METHOD('POST', auth, callback)
        }
        async PUT(auth, callback) {
                return this.#METHOD('PUT', auth, callback)
        }
        async DELETE(auth, callback) {
                return this.#METHOD('DELETE', auth, callback)
        }
        async PATCH(auth, callback) {
                return this.#METHOD('PATCH', auth, callback)
        }
        async ALL(auth, callback) {
                return this.#METHOD('ALL', auth, callback)
        }

        // data manager
        id = this.id

        async Send(data, status = 200) {
                this.res.setHeader('Content-Type', 'application/json')
                this.res.setHeader('Access-Control-Allow-Origin', "*")
                this.res.setHeader('Access-Control-Allow-Credentials', true);
                this.res.setHeader('X-Requested-With', 'NEXTJS')
                this.res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');

                this.res.status(status).json(data)

        }
}

export class APIAuth {
        constructor(req, res) {
                this.req = req
                this.res = res
                this.id = { _id: req.query._id }

                this._init = this._init.bind(this)
                this.UserId = this.UserId.bind(this)
                this.Send = this.Send.bind(this)

                this.isLogin = this.isLogin.bind(this)

        }
        async _init(req) {
                let { token } = req.headers
                let secret = process.env.secret || "dev"
                if (token) {
                        let detoken = await jwt.verify(token, secret)
                        let data = await User.findOne({ email: detoken.email })
                                .select('-password -__v')
                        return data
                } else return false
        }
        // testing start
        UserId() {
                return this._init(this.req)
                        .then(config => {
                                return { _id: config._id, email: config.email, }
                        })
        }

        // start code OK

        isLogin() {
                return this._init(this.req)
                        .then(config => {
                                if (config !== undefined || false) return true
                                else this.Send({ msg: "الرجاء تسجيل الدخول" })
                        })
        }

        async Send(data, status = 200) {
                this.res.setHeader('Content-Type', 'application/json')
                this.res.setHeader('Access-Control-Allow-Origin', "*")
                this.res.setHeader('Access-Control-Allow-Credentials', true);
                this.res.setHeader('X-Requested-With', 'NEXTJS')
                this.res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
                this.res.status(status).json(data)
        }
        // end code OK
}
