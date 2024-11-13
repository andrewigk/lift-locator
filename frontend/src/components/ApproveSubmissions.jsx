/* eslint-disable react/prop-types */
const ApproveSubmissions = ({ submissions }) => {
  return (
    <div>
      <h2>Gym Submission Data</h2>
      {submissions.map((submission, index) => {
        return (
          <div key={index}>
            <h4>{submission.name}</h4>
            <p>{submission.category}</p>
            <p>Submitted by user: {submission.submittedBy}</p>
            {submission.contactInfo.map((item, index) => {
              return (
                <div key={index}>
                  <h4>Contact Information: </h4>
                  <p>{item.name}</p>
                  <p>{item.email}</p>
                  <p>{item.phoneNumber}</p>
                </div>
              )
            })}
            {submission.inventory.map((item, index) => {
              return (
                <div key={index}>
                  <p>{item.condition}</p>
                  <p>{item.equipment}</p>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
export default ApproveSubmissions
