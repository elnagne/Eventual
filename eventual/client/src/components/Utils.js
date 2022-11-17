export function getUsersNameAsString(user) {
  if (!user) return null;
  if (user.name) {
    const firstName = user.name.first;
    const lastName = user.name.last;
    var name = "";
    if (firstName) name = name + firstName;
    if (firstName && lastName) name = name + " ";
    if (lastName) name = name + lastName;
    return name;
  }
  return null;
}

export function getLocationInfoAsString(address_data) {
  let locationStr = "";
  if (address_data.locality) {
    locationStr = locationStr + address_data.locality + ", ";
  }
  if (address_data.region) {
    locationStr = locationStr + address_data.region + ", ";
  }
  if (address_data.country) {
    locationStr = locationStr + address_data.country;
  }
  if (locationStr.endsWith(", ")) {
    locationStr = locationStr.slice(0, -2);
  }
  return locationStr;
}

export function getGoogleMapsURL(address_data, locationStr) {
  if (!locationStr) {
    return null;
  }
  if (!address_data) {
    const query = encodeURIComponent(locationStr);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }

  const latitude = address_data.latitude;
  const longitude = address_data.longitude;
  if (!latitude || !longitude) {
    return null;
  }

  return `https://maps.google.com/?q=${latitude},${longitude}`;
}

export function createShareBlurb(name, address, dateStr, timeStr) {
  let blurb = "";
  if (name) {
    blurb = blurb + "There's an upcoming event called \"" + name + '"!';
  } else {
    blurb = blurb + "There's an upcoming event!";
  }
  if (address || dateStr || timeStr) {
    blurb = blurb + " It's taking place";
    if (address) {
      blurb = blurb + " at " + address;
    }
    if (dateStr) {
      const dateObj = new Date(dateStr);
      const date = dateObj.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      blurb = blurb + " on " + date;
    }
    if (timeStr) {
      const timeObj = new Date("0000-01-01 " + timeStr);
      const time = timeObj.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      blurb = blurb + " at " + time;
    }
    blurb = blurb + "!";
  }
  blurb = blurb + " :D";
  return blurb;
}
