import { jsPDF } from 'jspdf';
import { portfolioData } from './data';

export function generateResumePDF() {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // margins and width
  const marginX = 20;
  let y = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contentWidth = pageWidth - (2 * marginX);

  // Colors
  const primaryColor = [13, 148, 136]; // #0d9488 (Teal)
  const darkColor = [31, 41, 55]; // #1f2937 (Charcoal)
  const grayColor = [75, 85, 99]; // #4b5563 (Gray)
  const lineSeparatorColor = [209, 213, 219]; // #d1d5db

  // Helper to add text and update y with page breaks
  const checkPageBreak = (neededHeight: number) => {
    if (y + neededHeight > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
  };

  // Header: Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(portfolioData.fullName.toUpperCase(), marginX, y);
  y += 7;

  // Header: Subtitle
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text(`${portfolioData.title} | ${portfolioData.subtitle}`, marginX, y);
  y += 6;

  // Header: Contacts & Location
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  const contactText = `${portfolioData.location}  |  Tel: ${portfolioData.phone}  |  Email: ${portfolioData.email}  |  COREN-RS: ${portfolioData.coren}`;
  doc.text(contactText, marginX, y);
  y += 5;

  // Horizontal line under header
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.5);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 8;

  // Helper to print standard sections
  const printSectionHeader = (title: string) => {
    checkPageBreak(15);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(title.toUpperCase(), marginX, y);
    y += 2.5;
    
    doc.setDrawColor(lineSeparatorColor[0], lineSeparatorColor[1], lineSeparatorColor[2]);
    doc.setLineWidth(0.25);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 5;
  };

  // SECTION: OBJETIVO
  printSectionHeader('Objetivo Profissional');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  const objLines = doc.splitTextToSize(portfolioData.objective, contentWidth);
  doc.text(objLines, marginX, y);
  y += (objLines.length * 4.8) + 5;

  // SECTION: PERFIL
  printSectionHeader('Perfil Profissional');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  const profileLines = doc.splitTextToSize(portfolioData.profileSummary, contentWidth);
  doc.text(profileLines, marginX, y);
  y += (profileLines.length * 4.8) + 5;

  // SECTION: EXPERIENCIA
  printSectionHeader('Experiência Profissional');
  portfolioData.experiences.forEach((exp) => {
    checkPageBreak(18);
    
    // Role & Period
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(exp.role, marginX, y);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    const periodText = exp.period;
    const periodWidth = doc.getTextWidth(periodText);
    doc.text(periodText, pageWidth - marginX - periodWidth, y);
    y += 4.5;

    // Company Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(exp.company, marginX, y);
    y += 5;

    // Activities
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    exp.activities.forEach((act) => {
      const actLines = doc.splitTextToSize(`• ${act}`, contentWidth - 4);
      checkPageBreak(actLines.length * 4.5 + 2);
      doc.text(actLines, marginX + 4, y);
      y += (actLines.length * 4.3);
    });
    y += 4; // Space between experiences
  });

  // SECTION: FORMACAO
  y += 2;
  printSectionHeader('Formação Acadêmica & Certificações');
  portfolioData.educationList.forEach((edu) => {
    checkPageBreak(15);
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(edu.degree, marginX, y);
    y += 4.5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(edu.institution, marginX, y);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    const eduPeriod = edu.period + (edu.location ? ` — ${edu.location}` : '');
    const eduPeriodWidth = doc.getTextWidth(eduPeriod);
    doc.text(eduPeriod, pageWidth - marginX - eduPeriodWidth, y);
    y += 7;
  });

  // SECTION: COMPETENCIAS
  y += 2;
  printSectionHeader('Principais Competências (Palavras-chave para ATS)');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  
  // Draw competencies in two columns or bullet list
  portfolioData.competencies.forEach((comp) => {
    const compLines = doc.splitTextToSize(`• ${comp}`, contentWidth - 4);
    checkPageBreak(compLines.length * 4.5 + 1);
    doc.text(compLines, marginX + 4, y);
    y += (compLines.length * 4.3);
  });

  // Footer on all pages
  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175);
    doc.text('Curriculum Vitae - LOHANA R. PALUDETT', marginX, pageHeight - 10);
    const pageNumText = `Página ${i} de ${totalPages}`;
    const pageNumWidth = doc.getTextWidth(pageNumText);
    doc.text(pageNumText, pageWidth - marginX - pageNumWidth, pageHeight - 10);
  }

  doc.save('Curriculo_Lohana_Paludett.pdf');
}
