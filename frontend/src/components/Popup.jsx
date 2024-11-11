/* eslint-disable react/prop-types */

import '../App.css'
const Popup = ({ item, addGymLocation }) => {
  return (
    <div className="popup">
      <h4>{item.place_name}</h4>
      <button onClick={() => addGymLocation(item)}>
        Add a gym listing here
      </button>
    </div>
  )
}
export default Popup
