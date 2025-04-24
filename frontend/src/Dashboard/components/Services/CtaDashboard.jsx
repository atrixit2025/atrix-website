import React, { useEffect, useRef, useState } from 'react';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import TextArea from '../form/input/TextArea';

const CtaDashboard = ({ onChange, initialData }) => {
  const [selectFields, setSelectFields] = useState([
    { id: 1, title: '', description: '' }
  ]);

  const prevInitialDataRef = useRef(null);

  useEffect(() => {
    // Only update if initialData has changed
    const initialDataString = JSON.stringify(initialData);
    const prevDataString = prevInitialDataRef.current;

    if (
      initialData &&
      initialData.length > 0 &&
      initialDataString !== prevDataString
    ) {
      prevInitialDataRef.current = initialDataString;

      const mapped = initialData.map((item, index) => ({
        id: index + 1,
        title: item.title || '',
        description: item.description || '',
      }));

      setSelectFields(mapped);
    }
  }, [initialData]);

  useEffect(() => {
    if (onChange) {
      const cleaned = selectFields
        .map((field) => ({
          title: field.title,
          description: field.description,
        }))
        .filter(
          (item) =>
            (item.title || '').trim() !== '' ||
            (item.description || '').trim() !== ''
        );

      onChange(cleaned);
    }
  }, [selectFields]);

  const handleTitleChange = (index, newValue) => {
    const updated = [...selectFields];
    updated[index].title = newValue;
    setSelectFields(updated);
  };

  const handleDescriptionChange = (index, newValue) => {
    const updated = [...selectFields];
    updated[index].description = newValue;
    setSelectFields(updated);
  };

  return (
    <div>
      <div className="space-y-6 relative">
        <Label>Cta</Label>
        <div className="border-2 border-gray-700 rounded-xl p-4 space-y-6">
          <Label htmlFor="left-text">Title</Label>
          <Input
            type="text"
            id="input"
            placeholder="Title"
            value={selectFields[0]?.title || ''}
            onChange={(e) => handleTitleChange(0, e.target.value)}
          />
          <div className="md:col-span-2">
            <Label htmlFor="right-text">Description</Label>
            <TextArea
              id="right-text"
              value={selectFields[0]?.description || ''}
              onChange={(value) => handleDescriptionChange(0, value)}
              placeholder="Description"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaDashboard;
