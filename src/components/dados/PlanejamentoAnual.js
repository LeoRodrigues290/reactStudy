import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Table} from 'react-bootstrap';
import * as XLSX from 'xlsx';
import './table.css';

function PlanejamentoAnual() {
    const [data, setData] = useState([]);
    const [planilhaImportada, setPlanilhaImportada] = useState(false);
    const headers = data.length > 0 ? data[0] : [];
    const rows = data.length > 1 ? data.slice(1) : [];


    function addIdToRow(row, rowIndex) {
        return row?.map((cell, colIndex) => ({
            id: '${rowIndex}_${colIndex}',
            value: cell,
        }));
    }

    function exportDataToExcel(data) {
        const worksheet = XLSX.utils.aoa_to_sheet(
            data.map((row) => row.map((cell) => cell.value))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'data.xlsx');
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const newData = sheetData.map(addIdToRow);
            setData(newData);
            setPlanilhaImportada(true);
        };

        reader.readAsText(file, 'UTF-8');
    };

    const handleCellValueChange = (e, cellId) => {
        const [rowIndex, colIndex] = cellId.split('_');
        const newData = [...data];
        newData[rowIndex][colIndex] = { ...newData[rowIndex][colIndex], value: e.target.value };
        setData(newData);
    };

    const handleExportData = useCallback(() => {
        exportDataToExcel(data);
    }, [data]);

    return (
        <>
            <input type="file" onChange={handleFileUpload} />
            <Table striped bordered hover className="Table">
                <thead>
                <tr>
                    {data.length > 0 &&
                    data[0].map((cell, index) => <th key={index}>{cell.value}</th>)}
                </tr>
                </thead>
                <tbody>
                {data.length > 0 &&
                data.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td key={cell.id}>
                                <input
                                    type="text"
                                    value={cell.value}
                                    onChange={(e) => handleCellValueChange(e, cell.id)}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </Table>
            <button onClick={handleExportData} disabled={!planilhaImportada}>
                Exportar Dados
            </button>
        </>
    );
}

PlanejamentoAnual.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                value: PropTypes.any,
            })
        )
    ),
    planilhaImportada: PropTypes.bool.isRequired,
};


export default PlanejamentoAnual;