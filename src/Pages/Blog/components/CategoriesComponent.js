import React from 'react';
import './CategoriesComponent.css';

const CategoriesComponent = ({ categories, selectedCategory, setSelectedCategory,}) => {
    const updateSelectedCategory = (event) => {
        const newCategory = event.target.value;
        if (newCategory !== selectedCategory) {
            setSelectedCategory(newCategory);
        }
    };

    return (
        <div className="displayCategoriesAndSearchBar">
            <select
                id="selectedCategory"
                style={{ width: '100%', maxWidth: '100%' }}
                value={selectedCategory}
                onChange={updateSelectedCategory}
            >
                <option value="All">All</option>
                {categories.map(c => (
                    <option key={c.name} value={c.name}>
                        {c.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CategoriesComponent;