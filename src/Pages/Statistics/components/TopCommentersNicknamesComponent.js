import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function TopCommentersNicknamesComponent({ topCommentersNicks }) {
    return (
        <div>
            <center><h3>Top Commenters Nicks</h3></center>
            <div style={{ height: 370, width: '100%', marginBottom: "40px" }}>
                <DataGrid
                    columns={[
                        { field: "nickname", headerName: "Nick", flex: 1, sortable: false, disableColumnMenu: true },
                        { field: "commentsCount", headerName: "Comments Count", flex: 1, sortable: false, disableColumnMenu: true }
                    ]}
                    rows={topCommentersNicks}
                    getRowId={(row) => row.nickname}
                    pageSize={5}
                />
            </div>
        </div>
    );
}