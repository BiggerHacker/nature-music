function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle (arr) {
  let result = arr.slice()
  for (let i = 0; i < result.length; i++) {
    let j = random(0, i)
    let test = result[i]
    result[i] = result[j]
    result[j] = test
  }
  return result
}
