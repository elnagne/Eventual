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
