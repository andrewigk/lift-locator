/* eslint-disable react/prop-types */

import EquipmentSelect from './EquipmentSelect'

import { useState } from 'react'
const AddGym = ({ handleSubmitGym, latitude, longitude }) => {
  const [gym, setGym] = useState({
    name: '',
    category: '',
    inventory: [],
    hasKilos: false,
    contactInfo: { name: null, phoneNumber: null, email: null },
    // latitude and longitude should be passed by props when the marker is interacted with
    latitude: latitude,
    longitude: longitude,
  })

  const categories = [
    'powerlifting',
    'bodybuilding',
    'weightlifting',
    'crossfit',
    'general',
  ]

  const condition = ['excellent', 'good', 'fair', 'worn', 'needs repair']

  const handleSubmit = () => {
    // perform extra validation here on the gym data before allowing it for submission

    handleSubmitGym()
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
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <h2>Add a gym listing</h2>
        <div className="formRow">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={gym.name}
            onChange={handleChange}
          ></input>
        </div>
        <div className="formRow">
          <label htmlFor="categories">Category/Niche</label>
          <select
            name="category"
            value={gym.category}
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
              value={gym.contactInfo.name}
              onChange={handleChange}
            ></input>
          </div>
          <div className="formRow">
            <label htmlFor="contactPhone">Phone Number</label>
            <input
              type="text"
              id="contactPhone"
              name="contactInfo.phoneNumber"
              value={gym.contactInfo.phoneNumber}
              onChange={handleChange}
            ></input>
          </div>
          <div className="formRow">
            <label htmlFor="contactEmail">Contact Email</label>
            <input
              type="text"
              id="contactEmail"
              name="contactInfo.email"
              value={gym.contactInfo.email}
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
