const Submission = require('../models/SubmittedGym')
const Approval = require('../models/ApprovedGym')

/** Retrieves all approved gyms committed to the database.
 *
 * @param {*} req
 * @param {*} res
 */
const getAllGyms = async (req, res) => {
  try {
    const gyms = await Approval.find()
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
  try {
    // Attempt to pass the entire request body (which hopefully contains all of the form data in the right format to match the Mongoose schema...)
    const submission = new Submission(req.body)
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
