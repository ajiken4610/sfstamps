// C:\Users\user\Documents\serviceaccountkey\sfqr-e5151-firebase-adminsdk-obaln-ad995d51de.json

var admin = require("firebase-admin");
var { getFirestore } = require("firebase-admin/firestore")

var serviceAccount = require("C:\\Users\\user\\Documents\\serviceaccountkey\\sfqr-e5151-firebase-adminsdk-obaln-ad995d51de.json");

admin.initializeApp({
  // @ts-ignore
  credential: admin.credential.cert(serviceAccount)
});
const toString = (data, key) => {
  const ret = (typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key])
  return typeof ret === "string" ? ret.replace(",", '_') : ret
}
(async () => {
  const db = getFirestore();
  const querySnapshot = await db.collection("user").get();
  const ret = []
  const rows = ["id"]
  querySnapshot.forEach((result) => {
    const data = result.data()
    const currentRow = [result.id]
    ret.push(currentRow)
    for (const key in data) {
      const index = rows.indexOf(key)

      if (index !== -1) {
        // 既に行があった場合
        currentRow[index] = toString(data, key)
      } else {
        rows.push(key)
        currentRow.push(toString(data, key))
      }
    }
  })
  let out = rows.join(",") + "\n"
  for (const row of ret) {
    out += row.join(",")
    out += "\n"
  }
  console.log(out)
})()
