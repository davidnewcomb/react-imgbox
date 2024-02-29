
export const niceString = (o) => {
  return JSON.stringify(o).replaceAll(',', ', ').replaceAll('"', '')
}

export const niceHtml = (o) => {
  return Object.keys(o).map(k => {
    const v = o[k];
    return k + '="' + v + '"'
  }).join(' ')
}
