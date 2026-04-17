export interface PatientReportData {
    patientName: string;
    patientId: string;
    dob: string;
    sex: string;
}

export interface PDFDictionary {
    labels: {
        patient: string;
        patientId: string;
        diagnosis: string;
        dob: string;
        sex: string;
        exam: string;
        reportId: string;
    };
    imagePlaceholderText: string;
}