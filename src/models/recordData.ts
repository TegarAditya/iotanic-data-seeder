import mongoose from "mongoose";

const RecordDataSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    topic: String,
    qos: Number,
    retain: Boolean,
    _msgid: String,
    createdAt: String,
    payload: {
      id_record: Number,
      latitude: String,
      longitude: String,
      natrium: Number,
      fosfor: Number,
      kalium: Number,
      ph: Number,
      time_records: String,
      measurement_id: String,
      sent_at: String,
    },
  },
  { collection: "mqtt_data" }
);

export default mongoose.model("mqtt_data", RecordDataSchema);
