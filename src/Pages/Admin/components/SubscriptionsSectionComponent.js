import React, { useEffect, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import DateUtil from '../../../util/DateUtil';
import ApiSubscribedEmailService from '../../../api/ApiSubscribedEmailService';

const SubscriptionsSectionComponent = () => {
    const apiSubscribedEmailService = new ApiSubscribedEmailService(process.env.REACT_APP_BACKEND_URL);
    const [subscriptions, setSubscriptions] = useState([]);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalElements, setTotalElements] = useState(0);

    useEffect(() => {
        fetchSubscriptions();
    }, [page, pageSize]);

    const fetchSubscriptions = async () => {
        try {
            const response = await apiSubscribedEmailService.fetchSubscribedEmailsPageable(page, pageSize);
            setSubscriptions(response.content);
            setTotalElements(response.totalElements);
        } catch (error) {
            console.log('Database connection error...');
        }
    };

    const updateSubscription = async (updatedSubscription) => {
        try {
            await apiSubscribedEmailService.putSubscribedEmail(updatedSubscription.id, updatedSubscription);
        } catch (error) {
            alert('Failed to update subscription');
            fetchSubscriptions();
        }
    };

    const deleteSubscription = async (id) => {
        try {
            await apiSubscribedEmailService.deleteSubscribedEmail(id);
            fetchSubscriptions();
        } catch (error) {
            alert('Failed to delete subscription');
        }
    };

    return (
        <div style={{ height: 585, width: '100%', marginBottom: "40px" }}>
            <DataGrid 
                columns={[
                    { field: "email", headerName: "Email", flex: 1, editable: true },
                    { field: "date", headerName: "Date", flex: 1, renderCell: (data) => DateUtil.convertStringDateTimezoneToClient(data.value) },
                    { field: "action", headerName: "Action", flex: 1, renderCell: (info) => (
                        <Button
                            style={{ backgroundColor: "#e8605d", padding: "3px 35px", width: "100%" }}
                            onClick={() => deleteSubscription(info.row.id)}
                            variant="contained">
                            Delete
                        </Button>
                    )}
                ]}
                rows={subscriptions}
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
                paginationMode="server"
                rowCount={totalElements}
                onPageChange={(newPage) => setPage(newPage)}
                onPageSizeChange={(newPageSize) => {
                    setPageSize(newPageSize);
                    setPage(0); // Reset to the first page
                }}
                onCellEditCommit={(params) => {
                    const updatedSubscription = { ...params.row, [params.field]: params.value };
                    updateSubscription(updatedSubscription);
                }}
            />
        </div>
    );
};

export default SubscriptionsSectionComponent;