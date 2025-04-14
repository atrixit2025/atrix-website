import React, { useState, useEffect } from 'react';
import Label from '../../components/form/Label';

function TagsInput({ initialTags = [], onChange }) {
  const [input, setInput] = useState('');
  const [tags, setTags] = useState(initialTags);
  
  // Reset tags when initialTags changes (for edit mode)
  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyDown = (event) => {
    const value = input.trim();

    if ((event.key === 'Enter' || event.key === ',' || event.key === ' ') && value) {
      event.preventDefault();

      if (!tags.includes(value)) {
        const newTags = [...tags, value];
        setTags(newTags);
        onChange(newTags);
      }
      setInput('');
    }

    if (event.key === 'Backspace' && input === '') {
      event.preventDefault();
      const newTags = tags.slice(0, -1);
      setTags(newTags);
      onChange(newTags);
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onChange(newTags);
  };

  return (
    <div className="w-full container">
      <Label htmlFor="tags-input">Add Tags</Label>
      <div className="flex flex-wrap items-center gap-2 border-gray-700 w-full rounded-lg border-2 appearance-none px-4 py-2.5 text-sm shadow-theme-xs focus:outline-hidden focus:ring-3 bg-(--black)">
        {tags.map((tag, index) => (
          <div 
            key={index} 
            className="flex items-center bg-(--blue) font-bold px-2 py-1 rounded text-sm"
          >
            {tag}
            <button 
              type="button" 
              onClick={() => handleRemoveTag(index)} 
              className="ml-1 text-sm hover:text-red-500 cursor-pointer"
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </div>
        ))}
        
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? 'Add tags ' : ''} 
          className="flex-1 min-w-[100px] outline-none placeholder:text-gray-400"
          id="tags-input"
        />
      </div>
    </div>
  );
}

export default TagsInput;