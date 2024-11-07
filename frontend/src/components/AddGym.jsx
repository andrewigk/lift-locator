/* eslint-disable react/prop-types */

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === 'checkbox') {
      setGym({ ...gym, [name]: checked })
    } else {
      setGym({ ...gym, [name]: value })
    }
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
      </form>
    </div>
  )
}
export default AddGym
