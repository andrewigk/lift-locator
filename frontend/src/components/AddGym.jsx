/* eslint-disable react/prop-types */

import EquipmentSelect from './EquipmentSelect.jsx'

import { useEffect } from 'react'
const AddGym = ({ handleSubmitGym, lngLat, gym, setGym, modalRef }) => {
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
    <div
      ref={modalRef}
      className="formContainer"
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
        width: 420,
        maxWidth: '100%',
        zIndex: 10,
        border: '1px solid var(--c-input-border)',
        backgroundColor: 'rgba(36, 36, 36, 0.9)',
      }}
    >
      <form onSubmit={handleSubmitGym}>
        <h2>Add a gym listing</h2>
        <div className="formRow">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={gym.name || ''}
            onChange={handleChange}
          ></input>
        </div>
        <div className="formRow">
          <label htmlFor="categories">Category/Niche</label>
          <select
            name="category"
            value={gym.category || ''}
            onChange={handleChange}
            style={{ width: '100px' }}
          >
            <option value="">Select...</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="formRow">
          {gym.category === 'powerlifting' ||
          gym.category === 'weightlifting' ? (
            <div>
              <h4>Has KG plates?</h4>
              <input
                type="checkbox"
                id="hasKilos"
                name="hasKilos"
                checked={gym.hasKilos}
                onChange={handleChange}
              ></input>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="formRow">
          <h2>Add Inventory</h2>
          {gym.inventory.map((item, index) => (
            <div key={index}>
              <EquipmentSelect
                index={index}
                value={item.equipment || ''}
                handleInventoryChange={handleInventoryChange}
              />
              <input
                type="number"
                placeholder="Count"
                value={item.count || ''}
                onChange={(e) =>
                  handleInventoryChange(index, 'count', e.target.value)
                }
              />
              <select
                value={item.condition || ''}
                onChange={(e) =>
                  handleInventoryChange(index, 'condition', e.target.value)
                }
              >
                <option value="">Select...</option>
                {condition.map((specCon, index) => {
                  return (
                    <option value={specCon} key={index}>
                      {specCon}
                    </option>
                  )
                })}
              </select>
            </div>
          ))}
        </div>
        <div>
          <button type="button" onClick={addInventorySelect}>
            {gym.inventory.length === 0 ? 'Add an item' : 'Add another item'}
          </button>
        </div>
        <div>
          <h2>Contact Information</h2>
          <div className="formRow">
            <label htmlFor="contactName">Primary Contact</label>
            <input
              type="text"
              id="contactName"
              name="contactInfo.name"
              value={gym.contactInfo.name || ''}
              onChange={handleChange}
            ></input>
          </div>
          <div className="formRow">
            <label htmlFor="contactPhone">Phone Number</label>
            <input
              type="text"
              id="contactPhone"
              name="contactInfo.phoneNumber"
              value={gym.contactInfo.phoneNumber || ''}
              onChange={handleChange}
            ></input>
          </div>
          <div className="formRow">
            <label htmlFor="contactEmail">Contact Email</label>
            <input
              type="text"
              id="contactEmail"
              name="contactInfo.email"
              value={gym.contactInfo.email || ''}
              onChange={handleChange}
            ></input>
          </div>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
        <pre>{JSON.stringify(gym, null, 2)}</pre>
      </form>
    </div>
  )
}
export default AddGym
