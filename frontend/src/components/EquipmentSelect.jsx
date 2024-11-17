/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import axios from 'axios'

const EquipmentSelect = ({ index, value, handleInventoryChange }) => {
  const [equipmentList, setEquipmentList] = useState([])

  // Fetch the equipment list from the backend using Axios
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/gyms/equipment')
        setEquipmentList(res.data)
        console.log(res)
      } catch (error) {
        console.error('Error fetching equipment:', error)
      }
    }

    fetchEquipment()
  }, [])

  return (
    <select
      value={value}
      className="equipment"
      onChange={(e) =>
        handleInventoryChange(index, 'equipment', e.target.value)
      }
    >
      <option value="">Select Equipment</option>
      {equipmentList.map((equipment) => (
        <option key={equipment._id} value={equipment._id}>
          {`${equipment.brand} - ${equipment.type}`}
        </option>
      ))}
    </select>
  )
}
export default EquipmentSelect
