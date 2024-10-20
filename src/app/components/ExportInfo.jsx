'use client';

import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

export default function ExportInfo({ userId }) {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/admin/${userId}`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [userId]);

    const generatePDF = () => {
        if (!userData) return;

        const doc = new jsPDF();
        doc.setFontSize(12);

        // Centrar el título
        const title = 'Reporte de Usuario';
        const pageWidth = doc.internal.pageSize.getWidth();
        const textWidth = doc.getTextWidth(title);
        const x = (pageWidth - textWidth) / 2;
        doc.text(title, x, 22);

        const body = [
            ['Id', userData.us_id],
            ['Nombres', userData.us_nombres],
            ['Apellidos', userData.us_apellidos],
            ['Rol', userData.rol_descripcion],
            ['Estado', userData.es_descripcion],
        ];

        doc.autoTable({
            body,
            startY: 30,
            theme: 'grid',
            styles: { fontSize: 10, cellPadding: 3 },
            showHead: 'never',
        });

        doc.save('reporte.pdf');
    };

    return (
        <button onClick={generatePDF} className="btn_export">
            Exportar PDF
        </button>
    );
}
