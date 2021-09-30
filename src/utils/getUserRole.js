export function getUserRole(userRole) {
  for (var role in userRole) {
    if (userRole[role] === true) {
      return role.charAt(0).toUpperCase() + role.slice(1);
    }
  }
}
