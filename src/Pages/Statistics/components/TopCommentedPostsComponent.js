import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function TopCommentedPostsComponent({ topCommentedPosts }) {
    return (
        <div>
            <center><h3>Top Commented Posts</h3></center>
            <div style={{ height: 370, width: '100%', marginBottom: "40px" }}>
                <DataGrid
                    columns={[
                        {
                            field: "title", headerName: "Title", flex: 1, sortable: false, disableColumnMenu: true, renderCell: (params) => (
                                <a style={{ display: "inline-block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textDecoration: "none" }}
                                    href={`${process.env.REACT_APP_FRONTEND_URL}post/${params.id}/${params.value}`}>{params.value}</a>
                            )
                        },
                        { field: "commentsCount", headerName: "Comments Count", flex: 1, sortable: false, disableColumnMenu: true }
                    ]}
                    rows={topCommentedPosts}
                    getRowId={(row) => row.id}
                    pageSize={5}
                />
            </div>
        </div>
    );
}