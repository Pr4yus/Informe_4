import { format } from 'date-fns';
export const fmt = (iso) => {
  try { return format(new Date(iso), 'yyyy-MM-dd HH:mm'); }
  catch { return iso; }
};
