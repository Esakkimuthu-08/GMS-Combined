const INDIA_TIME_ZONE = "Asia/Kolkata";

/** Parse backend timestamps, interpreting timezone-less values as UTC. */
export function parseUtcTimestamp(value) {
  if (value == null || value === "") return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value !== "string") return null;

  const timestamp = value.trim();
  if (!timestamp) return null;

  // DateTime.UtcNow is serialized without a zone by some API serializers.
  // Preserve explicit Z and numeric offsets as provided.
  const hasTimeZone = /(?:[zZ]|[+-]\d{2}:?\d{2})$/.test(timestamp);
  const date = new Date(hasTimeZone ? timestamp : `${timestamp}Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatIndiaTimestamp(value, options, locales = "en-IN") {
  const date = parseUtcTimestamp(value);
  if (!date) return "";

  return new Intl.DateTimeFormat(locales, {
    timeZone: INDIA_TIME_ZONE,
    ...options,
  }).format(date);
}

export function getIndiaDateKey(value) {
  const date = value instanceof Date ? value : parseUtcTimestamp(value);
  if (!date || Number.isNaN(date.getTime())) return null;

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: INDIA_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const fields = Object.fromEntries(parts.map(({ type, value: part }) => [type, part]));
  return `${fields.year}-${fields.month}-${fields.day}`;
}
