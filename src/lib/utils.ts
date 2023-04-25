/** Generate a random string id, mixing Date.now with Math.random */

export function getRandomId() {
  const stringDate = String(Date.now())
  const randomStringNumber = String(Math.random())
  return (stringDate + randomStringNumber).replace(/\./g, "")
}

/**
 * Create an array of length {@link length}, starting from {@link start}
 * 
 * - if {@link start} is missing, starting from 1
 */

export function createArrayOfNumbers(length: number, start: number = 1) {
  const pageNumbers = []

  for (let i = start; i < start + length; i++) {
    pageNumbers.push(i)
  }

  return pageNumbers
}