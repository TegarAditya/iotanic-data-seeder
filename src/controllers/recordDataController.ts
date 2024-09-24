import RecordData from "../models/recordData";
import { RecordDataType } from "../types/recordData";
import { mqttClient } from "../configs/mqtt";
import { driftCoordinates, extractDateFromObjectId } from "../utils/utils";

export const getRecordData = async () => {
  try {
    const recordData = await RecordData.find({});

    if (recordData.length <= 0) {
      throw { message: "Record data not found", status: 404 };
    } else {
      const recordDataWithDate = recordData.map((record) => {
        const recordObject = record.toObject();
        if (record._id) {
          recordObject.createdAt = extractDateFromObjectId(
            record._id
          ).toISOString();
        }

        if (recordObject.payload?.time_records) {
          const timeRecordsDate = new Date(recordObject.payload.time_records);
          timeRecordsDate.setDate(timeRecordsDate.getDate() - 1);
          recordObject.payload.time_records = timeRecordsDate.toISOString();
        }

        if (recordObject.payload?.sent_at) {
          const sentAtDate = new Date(recordObject.payload.sent_at);
          sentAtDate.setSeconds(sentAtDate.getSeconds() - 2);
          recordObject.payload.sent_at = sentAtDate.toISOString();
        }

        return recordObject;
      });

      return recordDataWithDate;
    }
  } catch (error) {
    throw error;
  }
};

export const seedRecordData = async (
  count: number,
  interval: number,
  latitude: string,
  longitude: string,
  measurement_id: string,
  init_time_records: string = new Date().toISOString()
) => {
  const recordData: RecordDataType = {
    id_record: 0,
    latitude,
    longitude,
    natrium: 0,
    fosfor: 0,
    kalium: 0,
    ph: 0,
    time_records: new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).toISOString(),
    measurement_id: measurement_id,
    sent_at: new Date(
      new Date().setDate(new Date().getMinutes() - 2)
    ).toISOString(),
  };

  for (let i = 0; i < count; i++) {
    recordData.id_record = i + 1;
    recordData.latitude = driftCoordinates(latitude, 0.0000003);
    recordData.longitude = driftCoordinates(longitude, 0.0000003);
    recordData.natrium = parseFloat((Math.random() * 1 + 45).toFixed(2));
    recordData.fosfor = parseFloat((Math.random() * 1 + 17).toFixed(2));
    recordData.kalium = parseFloat((Math.random() * 1 + 21).toFixed(2));
    recordData.ph = parseFloat((Math.random() * 1 + 6).toFixed(2));
    recordData.time_records = new Date(
      new Date(recordData.time_records).getTime() + i * interval
    ).toISOString();

    await createRecordData({ body: recordData });
  }
};

export const createRecordData = async ({ body }: { body: RecordDataType }) => {
  const recordData = body;

  try {
    mqttClient.subscribe("record/data", (err) => {
      if (!err) {
        mqttClient.publish("record/data", JSON.stringify(recordData));
      } else {
        throw err;
      }
    });

    return;
  } catch (error) {
    throw error;
  }
};
