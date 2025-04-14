import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Behance() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5300/Behance/api/images?username=atrixit');
        
        if (!res.data.images) {
          throw new Error('No images array in response');
        }
        
        // Filter to only include post images
        const postImages = res.data.images.filter(img => 
          img.includes('project') || 
          img.includes('808x454') ||
          img.match(/\/projects\/.*\.(jpg|png|gif)/i)
        );

      
        const projectData = postImages.map((img) => {
          const projectIdMatch = img.match(/\/(\d{9})\//);
          const projectId = projectIdMatch ? projectIdMatch[1] : null;
          
          return {
            imageUrl: img,
            projectUrl: projectId 
              ? `https://www.behance.net/gallery/${projectId}`
              : 'https://www.behance.net/atrixit' // Fallback to profile
          };
        });

        setProjects(projectData);
      } catch (err) {
        console.error('Error:', err);
        setError(`Error loading projects. ${err.message}`);
      }
    };
    fetchProjects();
  }, []);

  const handleImageClick = (projectUrl) => {
    window.open(projectUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='container' style={{ padding: 20, margin: 200 }}>
      <h1>Project Gallery</h1>
      
      {error && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          {error}
          <br />
          <small>Ensure backend is running: node server.js</small>
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 10
      }}>
        {projects.map((project, i) => (
          <div 
            key={i} 
            onClick={() => handleImageClick(project.projectUrl)}
            style={{ cursor: 'pointer' }}
          >
            <img 
              src={project.imageUrl} 
              alt={`Behance Project ${i}`} 
              style={{ 
                width: '100%', 
                borderRadius: 8,
                border: '1px solid #ddd',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}