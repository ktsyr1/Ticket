import { APIAuth } from "@/lib/app";
import API from "@/lib/server";
import { Program } from "@/models";

export default async function ProgramOneAPI(req, res, next) {
    const { body, query } = req;
    const app = new API(req, res);
    const Auth = new APIAuth(req, res);
    app.get(
        await Auth.isLogin(),
        async () => {
            const program = await Program.findById(query._id);
            app.Send(program);
        }
    );

    app.put(
        await Auth.isLogin(),
        async () => { 
            await Program.updateOne({ _id: query._id },  body);
            app.Send({ msg: "تم تحديث المعلومات" });
        }
    );

    app.delete(
        await Auth.isLogin(),
        async () => {
            await Program.deleteOne({ _id: query._id });
            app.Send({ msg: "تم حذف المعلومات" });
        }
    );
}
