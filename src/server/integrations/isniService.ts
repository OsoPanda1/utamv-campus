export function normalizeIsniId(isni: string) {
  return isni.replace(/\s+/g, '').trim();
}

export function isValidIsniShape(isni: string) {
  return /^[0-9]{15}[0-9X]$/.test(normalizeIsniId(isni));
}
