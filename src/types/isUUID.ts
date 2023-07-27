export const isUUID = (id: unknown): id is string => {
  return (
    typeof id === 'string' &&
    new RegExp(
      '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
    ).test(id)
  );
};
