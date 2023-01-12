import { getUserData } from "@lib/clientDB"
import { getFirestore } from "@lib/firebase-admin"

export const executeOverPerm = async (req, res, perms, callback: (req, res) => any) => {
  const uid = JSON.parse(req.body).executerUid
  const user = await getFirestore().collection("account").doc(uid).get()
  const executerRoles = Object.keys((user.get("roles") || null))
  const permCheck = executerRoles.some((r) => perms.indexOf(r) >= 0)

  if (!permCheck) return { permCheck: permCheck, permError: "insufficient permission" }
  return await callback(req, res)
}
