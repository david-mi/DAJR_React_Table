/** Generate a random string id, mixing Date.now with Math.random */

export function getRandomId() {
  const stringDate = String(Date.now())
  const randomStringNumber = String(Math.random())
  return (stringDate + randomStringNumber).replace(/\./g, "")
}

export function createArrayOfNumbers(length: number, start: number = 1) {
  const pageNumbers = []

  for (let i = start; i < start + length; i++) {
    pageNumbers.push(i)
  }

  return pageNumbers
}