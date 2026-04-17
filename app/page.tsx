/**
 * @author Ricardo Merlos Torres
 * @email rmerlos@g-metrics.com
 * @create date 2026-04-17 13:55:18
 * @modify date 2026-04-17 13:55:18
 * @desc [description]
 */

"use client"

import React from "react";
import dynamic from "next/dynamic";
import { PatientReportData, PDFDictionary } from "@/types/report";

const DynamicPDFViewer = dynamic(
  () => import('./components/PDFViewerWrapper'),
  { ssr: false }
)

export default function Home() {
  const mockData: PatientReportData & { examDate?: string, reportId?: string } = {
    patientName: "Max Mustermann",
    patientId: "P-88291",
    dob: "2026-12-12",
    sex: "Male",
    examDate: "2026-04-17",
    reportId: "RE-2024-001",
  };

  const mockDictionary: PDFDictionary = {
    labels: {
      patient: "Patient",
      patientId: "Patient ID",
      diagnosis: "Diagnosis",
      dob: "DOB",
      sex: "Sex",
      exam: "Exam Date",
      reportId: "Report ID"
    },
    imagePlaceholderText: "Image Placeholder"
  };

  return ( 
    <main style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      <DynamicPDFViewer data={mockData} dictionary={mockDictionary} />
    </main>
  )
  
}