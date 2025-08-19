import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, useWindowDimensions } from 'react-native';
import { TrendingUp, ArrowUpDown, PieChart, ChevronRight, FileText, X } from 'react-native-vector-icons';

const Report = () => {
  const { width } = useWindowDimensions();
  const [showReportModal, setShowReportModal] = useState(false);
  const [currentReportType, setCurrentReportType] = useState('');
  const [currentReportTitle, setCurrentReportTitle] = useState('');
  const [reportPeriod, setReportPeriod] = useState('this-month');
  const [reportFormat, setReportFormat] = useState('pdf');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [recentReports] = useState([
    { id: 1, name: 'January 2024 P&L Statement', date: '2024-01-15', format: 'pdf', type: 'profit-loss' },
    { id: 2, name: 'Q4 2023 Cash Flow Report', date: '2024-01-08', format: 'excel', type: 'cash-flow' },
  ]);

  const reportTitles = {
    'profit-loss': 'Profit & Loss Statement',
    'cash-flow': 'Cash Flow Report',
    'expense-analysis': 'Expense Analysis',
  };

  const generateReport = (reportType) => {
    setCurrentReportType(reportType);
    setCurrentReportTitle(reportTitles[reportType]);
    setShowReportModal(true);
  };

  const processReport = () => {
    const newReport = {
      id: Date.now(),
      name: `${currentReportTitle} - ${reportPeriod === 'custom' ? `${customStartDate} to ${customEndDate}` : reportPeriod.replace('-', ' ').replace('this', 'This')}`,
      date: new Date().toISOString().split('T')[0],
      format: reportFormat,
      type: currentReportType,
    };
    console.log('Report generated:', newReport);
    setShowReportModal(false);
    setReportPeriod('this-month');
    setReportFormat('pdf');
    setCustomStartDate('');
    setCustomEndDate('');
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <TouchableOpacity style={[styles.card, { width: (width - 16 * 3) / 2 }]} onPress={() => generateReport('profit-loss')}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#10b981' }]}>
              <TrendingUp name="trending-up" size={24} color="#fff" />
            </View>
            <ChevronRight name="chevron-right" size={20} color="#9ca3af" />
          </View>
          <Text style={styles.cardTitle}>Profit & Loss Statement</Text>
          <Text style={styles.cardDesc}>Monthly P&L report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, { width: (width - 16 * 3) / 2 }]} onPress={() => generateReport('cash-flow')}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#3b82f6' }]}>
              <ArrowUpDown name="arrow-up-down" size={24} color="#fff" />
            </View>
            <ChevronRight name="chevron-right" size={20} color="#9ca3af" />
          </View>
          <Text style={styles.cardTitle}>Cash Flow Report</Text>
          <Text style={styles.cardDesc}>Track cash movements</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.card, { width: (width - 16 * 3) / 2 }]} onPress={() => generateReport('expense-analysis')}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: '#ef4444' }]}>
              <PieChart name="pie-chart" size={24} color="#fff" />
            </View>
            <ChevronRight name="chevron-right" size={20} color="#9ca3af" />
          </View>
          <Text style={styles.cardTitle}>Expense Analysis</Text>
          <Text style={styles.cardDesc}>Detailed expense breakdown</Text>
        </TouchableOpacity>
      </View>

      {showReportModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Generate {currentReportTitle}</Text>
              <TouchableOpacity onPress={() => setShowReportModal(false)}>
                <X name="x" size={20} color="#9ca3af" />
              </TouchableOpacity>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Report Period</Text>
              <TextInput
                style={styles.input}
                value={reportPeriod}
                onChangeText={setReportPeriod}
              />
            </View>
            {reportPeriod === 'custom' && (
              <View style={styles.customDate}>
                <TextInput
                  style={styles.input}
                  value={customStartDate}
                  onChangeText={setCustomStartDate}
                  placeholder="Start Date"
                />
                <TextInput
                  style={styles.input}
                  value={customEndDate}
                  onChangeText={setCustomEndDate}
                  placeholder="End Date"
                />
              </View>
            )}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Format</Text>
              <TextInput
                style={styles.input}
                value={reportFormat}
                onChangeText={setReportFormat}
              />
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.generateButton} onPress={processReport}>
                <Text style={styles.buttonText}>Generate Report</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowReportModal(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <View style={styles.recentReports}>
        <Text style={styles.sectionTitle}>Recent Reports</Text>
        {recentReports.length > 0 ? (
          recentReports.map(report => (
            <View key={report.id} style={styles.reportItem}>
              <View style={styles.reportDetails}>
                <View style={[styles.iconContainer, { backgroundColor: '#10b981' }]}>
                  <FileText name="file-text" size={16} color="#fff" />
                </View>
                <View>
                  <Text style={styles.reportName}>{report.name}</Text>
                  <Text style={styles.reportDate}>{formatDate(report.date)} • {report.format.toUpperCase()}</Text>
                </View>
              </View>
              <View style={styles.reportActions}>
                <TouchableOpacity>
                  <Text style={styles.actionText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.actionText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <FileText name="file-text" size={48} color="#9ca3af" />
            <Text style={styles.emptyText}>No reports generated yet</Text>
            <Text style={styles.emptySubText}>Click on a report type above to get started</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 16, gap: 8 },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  iconContainer: { width: 48, height: 48, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#1a202c', marginBottom: 4 },
  cardDesc: { fontSize: 12, color: '#718096' },
  modalOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', borderRadius: 8, padding: 16, width: '80%', maxWidth: 400 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  modalTitle: { fontSize: 16, fontWeight: '600', color: '#1a202c' },
  formGroup: { marginBottom: 16 },
  label: { fontSize: 14, color: '#718096', marginBottom: 4 },
  input: { padding: 12, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8 },
  customDate: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  buttonGroup: { flexDirection: 'row', gap: 8 },
  generateButton: { flex: 1, backgroundColor: '#10b981', padding: 12, borderRadius: 8, alignItems: 'center' },
  cancelButton: { flex: 1, backgroundColor: '#d1d5db', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '500' },
  recentReports: { backgroundColor: '#fff', borderRadius: 8, padding: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#1a202c', marginBottom: 12 },
  reportItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  reportDetails: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  reportName: { fontSize: 14, fontWeight: '500', color: '#1a202c' },
  reportDate: { fontSize: 12, color: '#718096' },
  reportActions: { flexDirection: 'row', gap: 12 },
  actionText: { fontSize: 12, color: '#10b981', fontWeight: '500' },
  emptyState: { padding: 32, alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#718096', marginBottom: 8 },
  emptySubText: { fontSize: 12, color: '#9ca3af' },
});

export default Report;