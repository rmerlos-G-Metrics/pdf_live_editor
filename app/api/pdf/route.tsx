/**
 * @author Ricardo Merlos Torres
 * @email rmerlos@g-metrics.com
 * @create date 2026-04-17 14:57:25
 * @modify date 2026-04-17 14:57:25
 * @desc [description]
 */

import { NextRequest, NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { PatientReportPDF } from '@/app/components/PatientReportPDF';

export async function POST(req: NextRequest) {
  try {
    const { data, dictionary } = await req.json();

    // Generate the PDF as a stream on the server
    const stream = await renderToStream(
      <PatientReportPDF data={data} dictionary={dictionary} />
    );

    // Return the stream directly to the browser
    return new NextResponse(stream as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="report.pdf"',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}