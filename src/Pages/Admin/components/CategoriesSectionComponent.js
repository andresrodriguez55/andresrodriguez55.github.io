import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ApiCategoryService from '../../../api/ApiCategoryService';
import CreateCategoryRequest from '../../../data/dto/request/create/CreateCategoryRequest';
import UpdateCategoryRequest from '../../../data/dto/request/update/UpdateCategoryRequest'; // Assuming you have a DTO for update

const CategoriesSectionComponent = () => {
    const apiCategoryService = new ApiCategoryService(process.env.REACT_APP_BACKEND_URL);
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const cats = await apiCategoryService.fetchCategories();
            setCategories(cats);
        } catch (error) {
            console.log('Database connection error...');
        }
    };

    const postCategory = async () => {
        try {
            const requestDto = new CreateCategoryRequest(newCategoryName);
            await apiCategoryService.postCategory(requestDto);
            fetchCategories();
            setNewCategoryName(""); // Reset input field
        } catch (error) {
            alert('Failed to create category');
        }
    };

    const updateCategory = async (updatedCategory) => {
        try {
            const requestDto = new UpdateCategoryRequest(updatedCategory.name);
            await apiCategoryService.putCategory(updatedCategory.id, requestDto);
            fetchCategories();
        } catch (error) {
            alert('Failed to update category');
        }
    };

    const deleteCategory = async (id) => {
        try {
            await apiCategoryService.deleteCategory(id);
            fetchCategories();
        } catch (error) {
            alert('Failed to delete category');
        }
    };

    return (
        <div style={{ height: 370, width: '100%', marginBottom: "80px" }}>
            <DataGrid 
                columns={[
                    { field: "name", headerName: "Name", sortable: false, disableColumnMenu: true, editable: true, flex: 1 },
                    { field: "numberOfPosts", headerName: "Number of Posts", sortable: false, disableColumnMenu: true, flex: 1 },
                    { field: "action", headername: "Action", sortable: false, disableColumnMenu: true, flex: 1, renderCell: (info) => (
                        info.row.name === 'Projects' || info.row.name === 'Private' ? null : (
                            <Button
                                style={{ backgroundColor: "#e8605d", padding: "3px 35px", width: "100%" }}
                                onClick={() => deleteCategory(info.id)}
                                variant="contained">
                                Delete
                            </Button>
                        )
                    )}
                ]}
                rows={categories}
                getRowId={(row) => row.id}
                pageSize={4}
                components={{ Toolbar: GridToolbar }}
                onCellEditCommit={(params) => {
                    const updatedCategory = { ...params.row, [params.field]: params.value };
                    updateCategory(updatedCategory);
                }}
            />
            <label>New: </label>
            <input 
                type="text" 
                id="NewCategory" 
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)} 
            />
            <Button
                style={{ backgroundColor: "#0c7d06", width: "1%", height: "25px", padding: "3px 35px", marginTop: "2px" }}
                onClick={postCategory}
                variant="contained">
                POST
            </Button>
        </div>
    );
};

export default CategoriesSectionComponent;