import { Program } from "@/models";
import { APIAuth } from "@/lib/app";
import API from "@/lib/server";

export default async function ProgramAPI(req, res, next) {
  const { body } = req;
  const app = new API(req, res);
  const Auth = new APIAuth(req, res);

  app.get(
    await Auth.isLogin(),
    async () => {
      const programs = await Program.find().sort({ _id: -1 });
      app.Send(programs);
    }
  )

  app.post(
    await Auth.isLogin(),
    async () => {
      const program = await Program.create(body);
      app.Send(program);
    }
  );
}
