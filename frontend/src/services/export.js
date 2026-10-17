export const exportToCSV = (data, filename) => {
  if (!data || !data.length) return
  const headers = Object.keys(data[0]).join(',')
  const rows = data.map(row => Object.values(row).join(','))
  const csvContent = "data:text/csv;charset=utf-8," + headers + "\n" + rows.join("\n")
  
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", `${filename}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const exportToJSON = (data, filename) => {
  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data, null, 2))}`
  const link = document.createElement("a")
  link.setAttribute("href", jsonString)
  link.setAttribute("download", `${filename}.json`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
