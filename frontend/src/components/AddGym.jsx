/* eslint-disable react/prop-types */

import EquipmentSelect from './EquipmentSelect'

import { useState } from 'react'
const AddGym = ({ handleSubmitGym }) => {
  const [gym, setGym] = useState({
    name: '',
    category: '',
    inventory: [],
    hasKilos: false,
    contactInfo: [],
    latitude: 0,
    longitude: 0,
  })

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
    } else {
      setGym({ ...gym, [name]: value })
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
    <div>
      <form onSubmit={handleSubmitGym}>
        <h4>Add a gym listing</h4>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={gym.name}
            onChange={handleChange}
          ></input>
        </div>
        <div>
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
        <div>
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
        <div>
          <h4>Add Inventory</h4>
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
          <button type="submit">Submit</button>
        </div>
        <pre>{JSON.stringify(gym, null, 2)}</pre>
      </form>
    </div>
  )
}
export default AddGym
