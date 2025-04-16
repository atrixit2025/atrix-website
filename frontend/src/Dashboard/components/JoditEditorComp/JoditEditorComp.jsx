import React, { useRef, useEffect } from 'react'
import JoditEditor from "jodit-react";

const JoditEditorComp = ({ value, onChange }) => {
    const editor = useRef(null);
    const [content, setContent] = React.useState(value || "");
    
    // Update internal state when value prop changes
    useEffect(() => {
        setContent(value || "");
    }, [value]);

    const handleChange = (newContent) => {
        setContent(newContent);
        if (onChange) {
            onChange(newContent);
        }
    };
  
    return (
        <div>
            <JoditEditor
                ref={editor}
                value={content}
                onChange={handleChange}
            />
        </div>
    )
}

export default JoditEditorComp