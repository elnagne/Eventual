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

export function getGoogleMapsURL(address_data) {
  const latitude = address_data.latitude;
  const longitude = address_data.longitude;
  if (!latitude || !longitude) {
    return null;
  }

  return `https://maps.google.com/?q=${latitude},${longitude}`;
}