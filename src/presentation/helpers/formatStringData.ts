export const formatStringData = (data: string): boolean | null => {
  if (data !== undefined && data !== null && data !== '')
    return data as unknown as boolean;
  return null;
};