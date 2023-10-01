import API from "@/lib/server";
import { APIAuth } from "@/lib/app";
import { CarRentalModel } from "@/models";

export default async function CarRentalOneAPI(req, res, next) {
    const { body } = req;
    const app = new API(req, res);
    const Auth = new APIAuth(req, res);
    let id = app.id

    app.get(
        await Auth.isLogin(),
        async () => {
            const carRental = await CarRentalModel.findOne({ _id: id });
            app.Send(carRental);
        }
    );
    app.put(
        await Auth.isLogin(),
        async () => {
            await CarRentalModel.updateOne({ _id: id }, body);
            app.Send({ msg: "تم تحديث المعلومات" });
        }
    );
    app.delete(
        await Auth.isLogin(),
        async () => {
            await CarRentalModel.deleteOne({ _id: id });
            app.Send({ msg: "تم حذف المعلومات" });
        }
    );
}
