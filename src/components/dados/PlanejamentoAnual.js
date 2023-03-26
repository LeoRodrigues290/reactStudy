import React, {useState} from 'react';
import {Container, Table} from 'react-bootstrap';
import * as XLSX from 'xlsx';

function PlanejamentoAnual() {
    const [data, setData] = useState([]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, {type: 'binary'});
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const sheetData = XLSX.utils.sheet_to_json(worksheet, {header: 1});

            // Adicionar o campo "id" para cada objeto de linha
            const newData = sheetData.map((row, rowIndex) => {
                return row.map((cell, colIndex) => {
                    return {
                        id: `${rowIndex}_${colIndex}`,
                        value: cell,
                    };
                });
            });
            setData(newData);
        };
        reader.readAsText(file, 'UTF-8');
    };

    const handleCellValueChange = (e, cellId) => {
        const [rowIndex, colIndex] = cellId.split('_');
        const newData = [...data];
        newData[rowIndex][colIndex].value = e.target.value;
        setData(newData);
    };

    const handleExportData = () => {
        const worksheet = XLSX.utils.aoa_to_sheet(data.map((row) => row.map((cell) => cell.value)));
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, 'data.xlsx');
    };

    return (
        <Container>
            <input type="file" onChange={handleFileUpload}/>
            <Table striped bordered hover>
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
            <button onClick={handleExportData}>Exportar Dados</button>
        </Container>
    );
}

export default PlanejamentoAnual;
