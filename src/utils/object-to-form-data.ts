/**
 * Düz bir objeyi FormData'ya çevirir.
 * File ve Blob değerlerini olduğu gibi bırakır.
 * Array değerlerini key[] formatında ekler.
 * null ve undefined değerleri atlar.
 */
export function objectToFormData(
  obj: Record<string, unknown>,
  form?: FormData,
  namespace?: string
): FormData {
  const fd = form ?? new FormData();

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) continue;

    const formKey = namespace ? `${namespace}[${key}]` : key;

    if (value instanceof File || value instanceof Blob) {
      fd.append(formKey, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (item === null || item === undefined) return;

        if (item instanceof File || item instanceof Blob) {
          fd.append(`${formKey}[${index}]`, item);
        } else if (typeof item === "object") {
          objectToFormData(
            item as Record<string, unknown>,
            fd,
            `${formKey}[${index}]`
          );
        } else {
          fd.append(`${formKey}[]`, String(item));
        }
      });
    } else if (typeof value === "object" && !(value instanceof Date)) {
      objectToFormData(value as Record<string, unknown>, fd, formKey);
    } else if (value instanceof Date) {
      fd.append(formKey, value.toISOString());
    } else {
      fd.append(formKey, String(value));
    }
  }

  return fd;
}
