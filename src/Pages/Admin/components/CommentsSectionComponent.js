import React, { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DateUtil from '../../../util/DateUtil';
import ApiCommentService from '../../../api/ApiCommentService';

const CommentsSectionComponent = () => {
    const apiCommentService = new ApiCommentService(process.env.REACT_APP_BACKEND_URL);
    const [userComments, setUserComments] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageable, setPageable] = useState({ totalPages: 0, totalElements: 0 });

    useEffect(() => {
        fetchUserComments();
    }, [page, pageSize]);

    const fetchUserComments = async () => {
        try {
            const response = await apiCommentService.fetchCommentsPageable(page, pageSize);
            setUserComments(response.content);
            setPageable(response);
        } catch (error) {
            console.log(error.message);
        }
    };

    const putComment = async (newData) => {
        const row = newData.row;
        if (!row) {
            return;
        }
        row[newData.field] = newData.value;

        try {
            await apiCommentService.putComment(row.id, row);
        } catch (error) {
            fetchUserComments();
            alert('Failed to update comment');
        } 
    };

    const deleteComment = async (id) => {
        try {
            await apiCommentService.deleteComment(id);
            fetchUserComments();
        } catch (error) {
            alert('Failed to delete comment');
        }
    };

    return (
        <div style={{ height: 585, width: '100%', marginBottom: "40px" }}>
            <DataGrid 
                columns={[
                    { field: "postTitle", headerName: "Title of Post", flex: 1, renderCell: (params) => (
                        <a style={{ display: "inline-block", whiteSpace: "nowrap", overflow: "hidden", 
                            textOverflow: "ellipsis", textDecoration: "none" }}
                            href={`/#/post/${params.row.postId}/${params.value}`}
                            target='_blank'>{params.value}</a>
                    )},
                    { field: "nickname", headerName: "Nick", editable: true, flex: 1 },
                    { field: "content", headerName: "Content", editable: true, flex: 1 },
                    { field: "email", headerName: "Email", editable: true, flex: 1 },
                    { field: "notifyReply", headerName: "Notify", editable: true, flex: 0.4 },
                    { field: "country", headerName: "Country", flex: 0.7 },
                    { field: "date", headerName: "Date", flex: 1, 
                        renderCell: (data) => DateUtil.convertStringDateTimezoneToClient(data.value) },
                    { field: "action", headerName: "Action", flex: 1, renderCell: (info) => (
                        <Button
                            style={{ backgroundColor: "#e8605d", padding: "3px 35px", width: "100%" }}
                            onClick={() => deleteComment(info.id)}
                            variant="contained">
                            Delete
                        </Button>
                    )}
                ]}
                rows={userComments}
                components={{
                    NoRowsOverlay: () => (
                        <Stack height="100%" alignItems="center" justifyContent="center">
                            Session expired...
                        </Stack>
                    ),
                    Toolbar: GridToolbar 
                }}
                getRowId={(row) => row.id}
                pageSize={pageSize}
                rowsPerPageOptions={[5, 10, 20]}
                rowCount={pageable.totalElements}
                paginationMode="server"
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newPageSize) => {
                    setPageSize(newPageSize);
                    setPage(0); // Reset to the first page
                }}
                onCellEditCommit={putComment}
            />
        </div>
    );
};

export default CommentsSectionComponent;