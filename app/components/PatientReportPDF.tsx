import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Image as PDFImage} from "@react-pdf/renderer";
import { PatientReportData, PDFDictionary } from "@/types/report";
import { EYEMATE_LOGO_BASE64, G_METRICS_LOGO_BASE64 } from "@/constants/images";

// Note: @react-pdf uses a React Native-like styling engine.
// We are mapping our Tailwind palette manually here for clinical consistency.
const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        padding: 40,
        fontFamily: "Helvetica", // Clean sans-serif for clinical readability
    },
    header: {
        flexDirection: "row",
        alignItems: "center", // Align logo and title vertically
        borderBottomWidth: 1,
        borderBottomColor: "#0ea5e9",
        paddingBottom: 10,
        marginBottom: 20,
    },
    headerLogo: {
        width: 150,
        height: 40,
        marginRight: 15, // Space between logo and title
    },
    // Main layout container for Info + G-Metrics Logo
    infoSection: {
        flexDirection: "row",
        marginBottom: 30,
        alignItems: "flex-start",
    },
    // The actual grid layout (no borders)
    patientGrid: {
        flex: 1, // Takes up remaining space
        flexDirection: "row",
    },
    column: {
        flex: 1,
        flexDirection: "column",
        gap: 10, // Adds vertical spacing between rows
    },
    // Updated G-Metrics container for the right side
    sideLogoBox: {
        width: 100,
        height: 60,
        marginLeft: 20,
        justifyContent: "center",
    },
    // Simplified labels/values for borderless look
    infoGroup: {
        marginBottom: 8,
    },
    logoBox: {
        width: 120,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    logoText: {
        fontSize: 10,
        color: "#64748b", // Tailwind slate-500
        fontWeight: "bold",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#0f172a", // Tailwind slate-900
        textTransform: "uppercase",
        letterSpacing: 2,
    },
    sectionTitle: {
        fontSize: 12,
        color: "#0ea5e9", // health-blue
        fontWeight: "bold",
        marginBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderColor: "#e2e8f0",
        marginBottom: 30,
    },
    gridCell: {
        width: "50%", // 2 Columns
        padding: 10,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#e2e8f0",
    },
    label: {
        fontSize: 8,
        color: "#64748b",
        textTransform: "uppercase",
        marginBottom: 4,
    },
    value: {
        fontSize: 11,
        color: "#0f172a",
        fontWeight: "bold",
    },
    imagePlaceholder: {
        height: 250,
        backgroundColor: "#f8fafc",
        borderWidth: 2,
        borderColor: "#cbd5e1",
        borderStyle: "dashed",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    imagePlaceholderText: {
        color: "#94a3b8",
        fontSize: 12,
    },
    logo: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
    },
    footerContainer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 10,
    },
    footerText: {
        fontSize: 9,
        color: '#64748b',
    },
});

interface PatientReportPDFProps {
    data: PatientReportData;
    dictionary: PDFDictionary;
}

export const PatientReportPDF = ({ data, dictionary }: PatientReportPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* 1. Header: Logo and Title side-by-side */}
      <View style={styles.header}>
        <PDFImage style={styles.headerLogo} src={EYEMATE_LOGO_BASE64} />
        <Text style={styles.title}>{dictionary?.title || "Patient Report"}</Text>
      </View>

      {/* 2. Patient Info Section (Grid + Logo) */}
      <View style={styles.infoSection}>
        
        {/* Borderless Grid */}
        <View style={styles.patientGrid}>
          {/* Left Column: ID, Sex, DOB */}
          <View style={styles.column}>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>{dictionary?.labels.patientId || "Patient ID"} </Text> 
              <Text style={styles.value}>{data?.patientId || "-"}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>{dictionary?.labels.sex || "Sex"}</Text>
              <Text style={styles.value}>{data?.sex || "-"}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>{dictionary?.labels.dob || "DOB"}</Text>
              <Text style={styles.value}>{data?.dob || "-"}</Text>
            </View>
          </View>

          {/* Right Column: Exam Date, Report ID */}
          <View style={styles.column}>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>{dictionary?.labels.exam || "Exam Date"}</Text>
              <Text style={styles.value}>{data?.examDate || "-"}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>{dictionary?.labels.reportId || "Report ID"}</Text>
              <Text style={styles.value}>{data?.reportId || "-"}</Text>
            </View>
          </View>
        </View>

        {/* G-Metrics Logo on the far right of the grid area */}
        <View style={styles.sideLogoBox}>
          <PDFImage style={styles.logo} src={G_METRICS_LOGO_BASE64} />
        </View>
      </View>

      {/* 3. Dashboard Content */}
      <Text style={styles.sectionTitle}>Dashboard Data</Text>
      {[1, 2, 3, 4].map((i) => (
        <View key={i} style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>
            {dictionary?.imagePlaceholderText || "Placeholder text image"}
          </Text>
        </View>
      ))}

      {/* 4. Consistent Footer */}
      <View style={styles.footerContainer} fixed>
        <Text style={styles.footerText}>
          G-Metrics GmbH  |  www.g-metrics.health
        </Text>
        <Text 
          style={styles.footerText} 
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`} 
        />
      </View>
    </Page>
  </Document>
);

