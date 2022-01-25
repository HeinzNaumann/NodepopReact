import react, { useState, useEffect } from 'react';
import { getTags } from '../service';

function SelectTags(anuncios, checkModifier, ...props) {
    const [tags, setTags] = useState([]);

     useEffect(() => {
         getTags().then(setTags);
     }, []);
    
    return (
    <>
        {tags.map(tag => (
                <label key={tag}>
                    <input
                    type="checkbox"
                    value={tag}
                    checked={anuncios.tag}
                    onChange={checkModifier}
                    {...props}
                    />
            </label>
        ))}
    </>
    );
}

export default SelectTags;