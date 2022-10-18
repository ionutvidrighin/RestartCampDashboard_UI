import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { DataGrid } from '@material-ui/data-grid';
import { storeMonthlyStudentsExportData, clearMonthlyStudentsExportData } from "../../../redux/actions/cvsExportActions";

function Table({ tableColumns, tableData }) {
  //**Props description:
  // tableColumns = the columns to be rendered in the table (Array of Objects)
  // tableData = the actual data to be rendered in the table (Array of Objects)
  const dispatch = useDispatch()
  const [selectedTableRows, setSelectedTableRows] = useState([])

  useEffect(() => {
    if (selectedTableRows.length !== 0) {
      dispatch(storeMonthlyStudentsExportData(selectedTableRows))
    } else {
      dispatch(clearMonthlyStudentsExportData())
    }
  }, [selectedTableRows])


  return (
    <div>
      <div style={{ height: 600, width: "100%" }}>
        { tableData.length !== 0 &&
          <DataGrid
            headerHeight={80}
            rows={tableData}
            columns={tableColumns}
            pageSize={8}
            rowsPerPageOptions={[8]}
            checkboxSelection={true}
            disableColumnMenu={true}
            onSelectionModelChange={
              (id) => {
                const selectedIDs = new Set(id)
                const selectedRowsData = tableData.filter(row => selectedIDs.has(row.id))
                setSelectedTableRows(selectedRowsData)
              }
            }
          />
        }
      </div>
    </div>
  )
}

export default Table
