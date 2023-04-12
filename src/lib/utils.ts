/** Generate a random string id, mixing Date.now with Math.random */

export function getRandomId() {
  const stringDate = String(Date.now())
  const randomStringNumber = String(Math.random())
  return (stringDate + randomStringNumber).replace(/\./g, "")
}