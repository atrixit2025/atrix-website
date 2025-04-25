import React, { useEffect, useState } from 'react';
import Label from '../form/Label';
import Input from '../form/input/InputField';
import TextArea from '../form/input/TextArea';

const CtaDashboard = ({ onChange, initialData }) => {
  const [ctaData, setCtaData] = useState({
    title: '',
    description: ''
  });

// // In CtaDashboard.jsx
// useEffect(() => {
//   if (onChange) {
//     // Only call onChange if data has actually changed
//     const hasChanged = 
//       initialData?.title !== ctaData.title || 
//       initialData?.description !== ctaData.description;
    
//     if (hasChanged) {
//       onChange(ctaData);
//     }
//   }
// }, [ctaData, onChange, initialData]);

useEffect(() => {
  if (initialData && typeof initialData === 'object') {
    setCtaData({
      title: initialData.title || '',
      description: initialData.description || ''
    });
  }
}, [initialData]);

useEffect(() => {
  if (onChange) {
    onChange(ctaData);
  }
}, [ctaData, onChange]);


  const handleTitleChange = (e) => {
    setCtaData(prev => ({
      ...prev,
      title: e.target.value
    }));
  };

  const handleDescriptionChange = (newContent) => {
    setCtaData(prev => ({
      ...prev,
      description: newContent
    }));
  };

  return (
    <div>
      <div className="space-y-6 relative">
        <Label>Cta</Label>
        <div className="border-2 border-gray-700 rounded-xl p-4 space-y-6">
          <div>
            <Label htmlFor="cta-title">Title</Label>
            <Input
              type="text"
              id="cta-title"
              placeholder="Title"
              value={ctaData.title}
              onChange={handleTitleChange}
            />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="cta-description">Description</Label>
            <TextArea
              id="cta-description"
              value={ctaData.description}
              onChange={handleDescriptionChange}
              placeholder="Description"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaDashboard;