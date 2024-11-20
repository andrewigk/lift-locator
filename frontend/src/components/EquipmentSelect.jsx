/* eslint-disable react/prop-types */

const EquipmentSelect = ({
  index,
  value,
  handleInventoryChange,
  equipmentList,
}) => {
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
