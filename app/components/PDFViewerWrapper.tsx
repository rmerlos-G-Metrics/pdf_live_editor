/**
 * @author Ricardo Merlos Torres
 * @email rmerlos@g-metrics.com
 * @create date 2026-04-17 14:05:19
 * @modify date 2026-04-17 15:21:53
 * @desc [description]
 */

"use client";

import React, { useEffect, useState } from 'react';
import { PatientReportData, PDFDictionary } from '@/types/report';

interface Props {
  data: PatientReportData & { examDate?: string, reportId?: string };
  dictionary: PDFDictionary;
}

export default function PDFViewerWrapper({ data, dictionary }: Props) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);

    const fetchPdf = async () => {
      const res = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data, dictionary }),
      });

      if (!active) return;

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      }
      setLoading(false);
    };

    const timeout = setTimeout(fetchPdf, 500);

    return () => {
      active = false;
      clearTimeout(timeout);
      if (pdfUrl) URL.revokeObjectURL(pdfUrl); // Cleanup old URLs
    };
  }, [data, dictionary]); // Triggers when data changes

  if (loading && !pdfUrl) return <div>Generating PDF...</div>;

  return (
    <iframe 
      src={pdfUrl} 
      style={{ width: '100%', height: '100%', border: 'none' }} 
    />
  );
}