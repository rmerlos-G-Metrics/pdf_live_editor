/**
 * @author Ricardo Merlos Torres
 * @email rmerlos@g-metrics.com
 * @create date 2026-04-17 15:35:22
 * @modify date 2026-04-17 15:35:25
 * @desc [description]
 */

import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Image as PDFImage} from "@react-pdf/renderer";
import { PatientReportData, PDFDictionary } from "@/types/report";
import { EYEMATE_LOGO_BASE64, G_METRICS_LOGO_BASE64, EYEMATE_DASHBOARD_LOGO_BASE64 } from "@/constants/images";

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        padding: 40,
        fontFamily: "Helvetica", 
    },
    header: {
        flexDirection: "row",
        alignItems: "center", 
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderBottomColor: "#0ea5e9",
        paddingBottom: 10,
        marginBottom: 10,
    },
    headerLogo: {
        width: 350,
        height: 35,
    },
    infoSection: {
        flexDirection: "row",
        marginBottom: 10,
        alignItems: "flex-start",
    },
    patientGrid: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    column: {
        flex: 1,
        flexDirection: "column",
        gap: 10,
    },
    sideLogoBox: {
        width: 90,
        height: 55,
        justifyContent: "center",
    },
    infoGroup: {
        marginBottom: 8,
    },
    logoBox: {
        width: 120,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
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
        fontSize: 22,
    },
    footerContainer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 2,
        borderTopColor: '#0ea5e9',
        paddingTop: 5,
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
      
      <View style={styles.header}>
        <PDFImage style={styles.headerLogo} src={EYEMATE_DASHBOARD_LOGO_BASE64} />
        <View style={styles.sideLogoBox}>
          <PDFImage style={styles.logo} src={G_METRICS_LOGO_BASE64} />
        </View>
      </View>

      <View style={styles.infoSection}>
        
        <View style={styles.patientGrid}>
          <View style={styles.column}>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>{dictionary?.labels.patientId || "Patient ID"} </Text> 
              <Text style={styles.value}>{data?.patientId || "-"}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>{dictionary?.labels.sex || "Sex"}</Text>
              <Text style={styles.value}>{data?.sex || "-"}</Text>
            </View>
          </View>

          <View style={styles.column}>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>{dictionary?.labels.dob || "DOB"}</Text>
              <Text style={styles.value}>{data?.dob || "-"}</Text>
            </View>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>{dictionary?.labels.exam || "Exam Date"}</Text>
              <Text style={styles.value}>{data?.examDate || "-"}</Text>
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.infoGroup}>
              <Text style={styles.label}>{dictionary?.labels.reportId || "Report ID"}</Text>
              <Text style={styles.value}>{data?.reportId || "-"}</Text>
            </View>
          </View>
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

      {/* 4. Footer */}
      <View style={styles.footerContainer} fixed>
        <Text style={styles.footerText}>
          G-Metrics GmbH  |  www.g-metrics.com
        </Text>
        <Text 
          style={styles.footerText} 
          render={({ pageNumber, totalPages }) => `Page ${pageNumber} / ${totalPages}`} 
        />
      </View>
    </Page>
  </Document>
);

