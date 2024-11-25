/* eslint-disable react/prop-types */

import EquipmentSelect from './EquipmentSelect.jsx'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import Checkbox from '@mui/material/Checkbox'

import FormControlLabel from '@mui/material/FormControlLabel'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'

import { useEffect } from 'react'
const AddGym = ({
  handleSubmitGym,
  lngLat,
  gym,
  setGym,

  equipmentList,
  open,
  handleClose,
}) => {
  // Update gym latitude and longitude when lngLat changes
  useEffect(() => {
    if (lngLat.lat && lngLat.lng) {
      setGym((prevState) => ({
        ...prevState,
        latitude: lngLat.lat,
        longitude: lngLat.lng,
      }))
    }
  }, [lngLat, setGym]) // Trigger the effect whenever lngLat changes

  const categories = [
    'powerlifting',
    'bodybuilding',
    'weightlifting',
    'crossfit',
    'general',
  ]

  const condition = ['excellent', 'good', 'fair', 'worn', 'needs repair']

  const formClear = () => {
    setGym({
      ...gym,
      name: '',
      category: '',
      inventory: [],
      hasKilos: false,
      contactInfo: { name: null, phoneNumber: null, email: null },
    })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === 'checkbox') {
      setGym({ ...gym, [name]: checked })
    } else if (name.includes('.')) {
      const keys = name.split('.') // split nested elements like contactInfo : name, or email, etc.
      const nestedKey = keys[0]
      const innerKey = keys[1]
      setGym((prevState) => ({
        ...prevState,
        [nestedKey]: {
          ...prevState[nestedKey],
          [innerKey]: value,
        },
      }))
    } else {
      {
        setGym({ ...gym, [name]: value })
      }
    }
  }

  // Handle inventory change for a specific field
  const handleInventoryChange = (index, field, value) => {
    const newInventory = [...gym.inventory]
    if (!newInventory[index]) {
      newInventory[index] = {
        equipment: null,
        condition: '',
        count: 0,
        maxWeight: null,
        minWeight: null,
      }
    }
    //Bracket notation is so cool... dynamically sets like newInventory.index.field but depending on
    // index and the field that was passed into the function 'brand' 'type' etc.
    newInventory[index][field] = value
    setGym({ ...gym, inventory: newInventory })
  }

  // Add a new inventory item
  const addInventorySelect = () => {
    setGym({
      ...gym,
      inventory: [
        ...gym.inventory,
        {
          equipment: null,
          condition: '',
          count: 0,
          maxWeight: null,
          minWeight: null,
        },
      ],
    })
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          '& .MuiDialog-paper': {
            maxWidth: 'md',
          },
        }}
      >
        <DialogTitle>Add a Gym Listing</DialogTitle>
        <form onSubmit={handleSubmitGym}>
          <DialogContent>
            <DialogContentText>
              Enter all related data in the form. The more thorough and accurate
              the information is, the better.
            </DialogContentText>
            <TextField
              required
              id="name"
              name="name"
              label="Gym name"
              type="text"
              value={gym.name || ''}
              fullWidth
              onChange={handleChange}
              variant="outlined"
              margin="dense"
            />

            <FormControl required variant="outlined" fullWidth margin="dense">
              <InputLabel>Category/Niche</InputLabel>
              <Select
                name="category"
                value={gym.category || ''}
                onChange={handleChange}
                label="Category"
                // This label will now correctly associate with InputLabel
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div>
              {gym.category === 'powerlifting' ||
              gym.category === 'weightlifting' ? (
                <FormControlLabel
                  required
                  control={
                    <Checkbox
                      id="hasKilos"
                      name="hasKilos"
                      checked={gym.hasKilos}
                      onChange={handleChange}
                      size="small"
                      sx={{
                        color: 'secondary.main',
                        '&.Mui-checked': {
                          color: 'secondary.main',
                        },
                      }}
                    />
                  }
                  label="Has KG Plates?"
                ></FormControlLabel>
              ) : (
                ''
              )}
            </div>

            <TextField
              type="text"
              variant="outlined"
              id="contactName"
              margin="dense"
              fullWidth
              label="Primary Contact's Name"
              name="contactInfo.name"
              value={gym.contactInfo.name || ''}
              onChange={handleChange}
            ></TextField>

            <TextField
              type="text"
              fullWidth
              margin="dense"
              variant="outlined"
              label="Primary Contact Phone Number"
              id="contactPhone"
              name="contactInfo.phoneNumber"
              value={gym.contactInfo.phoneNumber || ''}
              onChange={handleChange}
            ></TextField>

            <TextField
              type="text"
              fullWidth
              margin="dense"
              variant="outlined"
              label="Primary Contact Email Address"
              id="contactEmail"
              name="contactInfo.email"
              value={gym.contactInfo.email || ''}
              onChange={handleChange}
            ></TextField>

            <Stack
              direction="row"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                gap: 0,
                marginTop: '10px',
              }}
            >
              {gym.inventory.map((item, index) => (
                <Box
                  className="inventoryItem"
                  key={index}
                  sx={{
                    display: 'flex',
                    gap: 1,
                    flexWrap: 'wrap',
                    maxWidth: '800px',
                    justifyContent: 'start',
                  }}
                >
                  {/* Equipment Selector */}
                  <EquipmentSelect
                    index={index}
                    equipmentList={equipmentList}
                    value={item.equipment || ''}
                    handleInventoryChange={handleInventoryChange}
                  />

                  {/* Count Field */}
                  <TextField
                    type="text"
                    label="Count"
                    name="count"
                    id="count"
                    title="Count (stock) of item"
                    required
                    size="small"
                    variant="outlined"
                    value={item.count || ''}
                    onChange={(e) =>
                      handleInventoryChange(index, 'count', e.target.value)
                    }
                    sx={{ flex: '0 1 15%' }}
                  />

                  {/* Condition Dropdown */}
                  <FormControl
                    required
                    variant="outlined"
                    size="small"
                    sx={{ flex: '0 1 20%', margin: 0 }}
                  >
                    <InputLabel>Condition</InputLabel>
                    <Select
                      name="condition"
                      label="Condition"
                      title="Condition"
                      value={item.condition || ''}
                      onChange={(e) =>
                        handleInventoryChange(
                          index,
                          'condition',
                          e.target.value
                        )
                      }
                    >
                      {condition.map((specCon, index) => (
                        <MenuItem value={specCon} key={index}>
                          {specCon}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Comment Field */}
                  <TextField
                    type="text"
                    label="Comments"
                    name="comment"
                    id="comment"
                    title="Additional comments and details about the item"
                    variant="outlined"
                    size="small"
                    value={item.comment || ''}
                    onChange={(e) =>
                      handleInventoryChange(index, 'comment', e.target.value)
                    }
                    sx={{ flex: 1 }}
                  />
                </Box>
              ))}
            </Stack>
            <div style={{ marginTop: '10px' }}>
              <Tooltip title="Click to begin adding entries to the gym inventory or add additional entries.">
                <Button
                  type="button"
                  variant="contained"
                  size="medium"
                  onClick={addInventorySelect}
                >
                  {gym.inventory.length === 0
                    ? 'Add an item to inventory'
                    : 'Add another item'}
                </Button>
              </Tooltip>
            </div>
          </DialogContent>
          <DialogActions>
            <Tooltip title="Clears all data for the current location selected.">
              <Button onClick={formClear} color="primary" variant="contained">
                Clear
              </Button>
            </Tooltip>
            <Button onClick={handleClose} color="primary" variant="contained">
              Cancel
            </Button>
            <Tooltip title="Submit listing, pending approval by admin.">
              <Button type="submit" color="primary" variant="contained">
                Submit
              </Button>
            </Tooltip>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
export default AddGym
