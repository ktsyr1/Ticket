import API from "@/lib/server";
import { Program } from "@/models";

export default async function ApiPrograms(req, res, next) {
    const app = new API(req, res);

    app.get(async () => {
        const programs = await Program.findById(app.id).sort({ _id: -1 });
        app.Send(programs);
    });
}
