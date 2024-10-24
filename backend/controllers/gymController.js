const SubmittedGym = require('../models/SubmittedGym')
const ApprovedGym = require('../models/ApprovedGym')

/** Retrieves all approved gyms committed to the database.
 *
 * @param {*} req
 * @param {*} res
 */
const getAllGyms = async (req, res) => {
  try {
    const gyms = await ApprovedGym.find()
    res.status(200).json(gyms)
  } catch (err) {
    res.status(500).json({ message: 'Server Error' })
  }
}

/** Creates a new gym submission, which is a separate collection
 * than approved submissions.
 *
 * @param {*} req
 * @param {*} res
 */
const submitGym = async (req, res) => {
  const { latitude, longitude, name, images, submittedBy } = req.body
  try {
    const submission = new SubmittedGym({
      latitude,
      longitude,
      name,
      images,
      submittedBy,
    })
    await submission.save()
    res.status(201).json(submission)
  } catch (err) {
    res.status(500).json({ message: 'Server Error' })
  }
}

/* TODO: Implement approveGym function? Might not need if it can be
handled manually by the admin. Especially since a regular user will
never be approving a gym submission */

module.exports = { getAllGyms, submitGym }
