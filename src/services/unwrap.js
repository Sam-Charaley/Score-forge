// Every data call goes through this, so a failed request surfaces as an
// exception the UI can report instead of looking like an empty result.
export function unwrap({ data, error }, action) {
  if (error) throw new Error(`Couldn't ${action}. ${error.message}`);
  return data;
}
