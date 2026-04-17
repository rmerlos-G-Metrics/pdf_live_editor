/**
 * @author Ricardo Merlos Torres
 * @email rmerlos@g-metrics.com
 * @create date 2026-04-17 14:05:19
 * @modify date 2026-04-17 14:05:19
 * @desc [description]
 */

"use client";

import React, { useEffect } from 'react';
import { usePDF } from '@react-pdf/renderer';
import { PatientReportPDF } from './PatientReportPDF';
import { PatientReportData, PDFDictionary } from '@/types/report';

interface Props {
  data: PatientReportData & { examDate?: string, reportId?: string };
  dictionary: PDFDictionary;
}

export default function PDFViewerWrapper({ data, dictionary }: Props) {
  // 1. Use the hook instead of the component
  const [instance, updateInstance] = usePDF({
    document: <PatientReportPDF data={data} dictionary={dictionary} />
  });

  useEffect(() => {
    updateInstance();
  }, [data, dictionary, updateInstance]);

  if (instance.loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'white' }}>
        Rendering Live Changes...
      </div>
    );
  }

  if (instance.error) {
    return (
      <div style={{ padding: 20, color: '#ef4444', backgroundColor: '#fee2e2', height: '100%' }}>
        <strong>PDF Error:</strong> {String(instance.error)}
      </div>
    );
  }

  return (
    <iframe 
      src={instance.url || ''} 
      style={{ width: '100%', height: '100%', border: 'none' }} 
      title="Live PDF Preview"
    />
  );
}