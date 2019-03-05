export function getAuthToken(apiID: string, secret: string) {
  return btoa(`${apiID}:${secret}`);
}
