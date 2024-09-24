import mongoose from "mongoose";

export function driftCoordinates(coord: string, drift: number): string {
  const coords = parseFloat(coord.replace(",", "."));

  const random = Math.random() < 0.5 ? -1 : 1;

  const driftedCoords = coords + random * drift;

  return driftedCoords.toFixed(7).toString();
}

export function extractDateFromObjectId(
  objectId: mongoose.Types.ObjectId
): Date {
  const timestamp = objectId.getTimestamp();
  return new Date(
    new Date(timestamp.getTime()).setMilliseconds(
      parseFloat((Math.random() * (185 - 170) + 170).toFixed(3))
    )
  );
}
