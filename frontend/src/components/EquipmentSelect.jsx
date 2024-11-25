/* eslint-disable react/prop-types */
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

const EquipmentSelect = ({
  index,
  value,
  handleInventoryChange,
  equipmentList,
}) => {
  return (
    <FormControl
      required
      variant="outlined"
      margin="dense"
      size="small"
      title="Specific item of equipment"
      sx={{ flex: '1', margin: 0 }}
    >
      <InputLabel>Equipment</InputLabel>
      <Select
        name="equipment"
        value={value}
        onChange={(e) =>
          handleInventoryChange(index, 'equipment', e.target.value)
        }
        label="Equipment"
      >
        {equipmentList.map((equipment) => (
          <MenuItem key={equipment._id} value={equipment._id}>
            {`${equipment.brand} - ${equipment.type}`}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export default EquipmentSelect
