import { formatDistance, parseISO, differenceInDays } from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const dateToCheck = `${year}-${month}-${day}`;
  return formatDistance(dateToCheck, new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");
};
// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const formatUpperCase = (name) => {
  return name?.split("", 1).at(0).toUpperCase().concat(name.slice(1));
};

const base64Converter = (file) => {
  return new Promise((res, rej) => {
    const fr = new FileReader()
    fr.readAsDataURL(file)
    fr.onload = () => res(fr.result.split(',')[1])
    fr.onerror = (err) => rej(err)
  })
}


export const imageUploader = async (files, name) => {
  const images = await Promise.all([...files].map(file => base64Converter(file)));

  const urls = await Promise.all(
    images.map(async (img, i) => {
      const formData = new FormData();
      formData.append('image', img);
      formData.append('name', `${name}-${i}`);

      const res = await fetch(`https://api.imgbb.com/1/upload?expiration=15552000&key=dbe92cff97dfd3389f9b98097954f127`, {
        method: 'POST',
        body: formData,
      });
      const response = await res.json();

      if (response.success) {
        return response.data.url;
      } else {
        throw new Error(response.error.message);
      }
    })
  );
  return urls

}