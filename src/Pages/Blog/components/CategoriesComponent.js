import React from 'react';
import './CategoriesComponent.css'

const CategoriesComponent = ({ categories, selectedCategory, setSelectedCategory, searchedToken, setSearchedToken }) => {
    const updateSelectedCategory = (event) => {
        setSelectedCategory(event.target.value);
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

            <div>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchedToken}
                    onChange={(event) => setSearchedToken(event.target.value)}
                />
            </div>
        </div>
    );
};

export default CategoriesComponent;