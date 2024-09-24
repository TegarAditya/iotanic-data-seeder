import Elysia, { t } from "elysia";
import {
  createRecordData,
  getRecordData,
  seedRecordData,
} from "../controllers/recordDataController";

export default (app: Elysia) => {
  app
    .get("/records", async () => {
      return await getRecordData();
    })
    .post(
      "/records",
      async ({ body }) => {
        return await createRecordData({ body });
      },
      {
        body: t.Object({
          id_record: t.Number(),
          latitude: t.String(),
          longitude: t.String(),
          natrium: t.Number(),
          fosfor: t.Number(),
          kalium: t.Number(),
          ph: t.Number(),
          time_records: t.String(),
          measurement_id: t.String(),
          sent_at: t.String(),
        }),
      }
    )
    .post(
      "/records/seed",
      async ({ body }) => {
        const {
          count,
          interval,
          latitude,
          longitude,
          measurement_id,
        } = body;
        return await seedRecordData(
          count,
          interval,
          latitude,
          longitude,
          measurement_id
        );
      },
      {
        body: t.Object({
          count: t.Number(),
          interval: t.Number(),
          latitude: t.String(),
          longitude: t.String(),
          measurement_id: t.String(),
          init_time_records: t.Optional(t.String()),
        }),
      }
    );
};
