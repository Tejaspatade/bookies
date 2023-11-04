export const generateId = (): number => {
  // Generate random number as id between 0 and 10000
  return Math.floor(Math.random() * 10001)
}