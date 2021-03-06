import ActiveCampaign from 'active-campaign-api-node'

const ac = new ActiveCampaign({
  apiUrl: process.env.ACTIVE_CAMPAIGN_URL,
  apiKey: process.env.ACTIVE_CAMPAIGN_KEY,
})

const addContact = async (contact) => {
  return await ac.contacts.contact.create({ contact })
}

const listId = process.env.NODE_ENV !== 'production' ? 3 : 1
const addContactToList = async (id) => {
  const body = { contactList: { contact: id, list: listId, status: 1 } }
  return await ac.contacts.contact.updateListStatus(body)
}

export default async function handler(req, res) {
  try {
    const { data } = await addContact(req.body)
    await addContactToList(parseInt(data.contact.id))
    res.status(200).json({
      message: 'Contact added successfully',
      contact: req.body,
    })
  } catch (err) {
    console.log(err)
    res
      .status(400)
      .json({ error: { message: 'Email is in the system already' } })
  }
}
