const Submission = require('../models/SubmittedGym')
const Approval = require('../models/ApprovedGym')
const Equipment = require('../models/Equipment')

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
    res.status(500).json({ message: 'Server Error', error: err })
  }
}

/** Retrieves all submitted gyms committed to the database.
 *
 * @param {*} req
 * @param {*} res
 */
const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find()
    res.status(200).json(submissions)
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err })
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
    console.log(submission)

    await submission.save()
    res.status(201).json(submission)
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err })
  }
}

/** Creates a new document in Approvals collection, effectively "approving" a submission
 *
 *
 * @param {*} req
 * @param {*} res
 */
const approveGym = async (req, res) => {
  try {
    console.log(req.body._id)
    let existingSubmission = await Submission.findOne({ _id: req.body._id })
    if (existingSubmission) {
      existingSubmission.status = 'approved'

      await existingSubmission.save()
    }

    const approval = new Approval(req.body)

    console.log(approval)
    approval.status = 'approved'

    await approval.save()
    res.status(201).json(approval)
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err })
  }
}

const getEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find()
    console.log(equipment)
    res.status(200).json(equipment)
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err })
  }
}

/* TODO: Implement approveGym function? Might not need if it can be
handled manually by the admin. Especially since a regular user will
never be approving a gym submission */

module.exports = {
  getAllGyms,
  submitGym,
  getEquipment,
  getAllSubmissions,
  approveGym,
}
