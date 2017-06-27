export function prefix (el, val, key = 'Transform') {
  let prefixList = ['webkit', 'moz', 'ms', 'o', '']
  prefixList.forEach((v) => {
    if (v) {
      el.style[v + key] = val
    } else {
      el.style.transform = val
    }
  })
  return el
}
