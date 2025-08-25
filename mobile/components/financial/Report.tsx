import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';

type ReportType = 'profit-loss' | 'cash-flow' | 'expense-analysis';

const Report = () => {
  const { width } = useWindowDimensions();
  const [showReportModal, setShowReportModal] = useState(false);
  const [currentReportType, setCurrentReportType] = useState<ReportType | ''>('');
  const [currentReportTitle, setCurrentReportTitle] = useState('');
  const [reportPeriod, setReportPeriod] = useState('this-month');
  const [reportFormat, setReportFormat] = useState('pdf');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [recentReports, setRecentReports] = useState([
    { id: 1, name: 'January 2024 P&L Statement', date: '2024-01-15', format: 'pdf', type: 'profit-loss' },
    { id: 2, name: 'Q4 2023 Cash Flow Report', date: '2024-01-08', format: 'excel', type: 'cash-flow' },
    { id: 3, name: 'February 2024 Expense Analysis', date: '2024-02-10', format: 'pdf', type: 'expense-analysis' },
    { id: 4, name: 'Q1 2024 Cash Flow Report', date: '2024-04-01', format: 'excel', type: 'cash-flow' },
  ]);

  const reportTitles: Record<ReportType, string> = {
    'profit-loss': 'Profit & Loss Statement',
    'cash-flow': 'Cash Flow Report',
    'expense-analysis': 'Expense Analysis',
  };

  const getDynamicStyles = () => ({
    container: { flex: 1, backgroundColor: '#fff', padding: width < 480 ? 8 : 16 },
    header: { flexDirection: 'row' as const, justifyContent: 'space-between' as const, alignItems: 'center' as const, marginBottom: width < 480 ? 8 : 12 },
    generateButton: { backgroundColor: '#10b981', padding: width < 480 ? 6 : 12, borderRadius: 8, flexDirection: 'row' as const, alignItems: 'center' as const, gap: width < 480 ? 4 : 8 },
    buttonText: { color: '#fff', fontWeight: '500' as const, fontSize: width < 480 ? 12 : 14 },
    modalOverlay: { flex: 1, justifyContent: 'center' as const, alignItems: 'center' as const, backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { backgroundColor: '#fff', borderRadius: 8, padding: width < 480 ? 8 : 16, width: '80%' as const },
    modalTitle: { fontSize: width < 480 ? 14 : 16, fontWeight: '600' as const, color: '#1a202c', marginBottom: width < 480 ? 6 : 12 },
    formGrid: { flexDirection: 'column' as const, gap: width < 480 ? 4 : 8 },
    input: { padding: width < 480 ? 6 : 12, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 8 },
    pickerContainer: { backgroundColor: '#fff', borderRadius: 8, padding: width < 480 ? 6 : 12, borderWidth: 1, borderColor: '#e2e8f0', width: '100%' as const },
    buttonContainer: { flexDirection: 'row' as const, gap: width < 480 ? 4 : 8, marginTop: width < 480 ? 6 : 12 },
    submitButton: { flex: 1, backgroundColor: '#10b981', padding: width < 480 ? 6 : 12, borderRadius: 8, alignItems: 'center' as const },
    cancelButton: { flex: 1, backgroundColor: '#d1d5db', padding: width < 480 ? 6 : 12, borderRadius: 8, alignItems: 'center' as const },
    recentReports: { marginTop: width < 480 ? 8 : 16 },
    sectionTitle: { fontSize: width < 480 ? 14 : 16, fontWeight: '600' as const, color: '#1a202c', marginBottom: width < 480 ? 6 : 12 },
    reportItem: { flexDirection: 'row' as const, justifyContent: 'space-between' as const, paddingVertical: width < 480 ? 6 : 12, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
    reportDetails: { flexDirection: 'row' as const, gap: width < 480 ? 4 : 8, alignItems: 'center' as const },
    reportName: { fontSize: width < 480 ? 12 : 14, fontWeight: '500' as const, color: '#1a202c' },
    reportDate: { fontSize: width < 480 ? 10 : 12, color: '#718096' },
    reportActions: { flexDirection: 'row' as const, gap: width < 480 ? 4 : 8 },
    actionText: { fontSize: width < 480 ? 12 : 14, color: '#10b981', fontWeight: '500' as const },
    emptyState: { padding: width < 480 ? 16 : 48, alignItems: 'center' as const },
    emptyText: { fontSize: width < 480 ? 14 : 16, color: '#718096', marginBottom: width < 480 ? 4 : 8 },
    emptySubText: { fontSize: width < 480 ? 10 : 12, color: '#9ca3af' },
  });

  const generateReport = () => {
    if (!currentReportType || (reportPeriod === 'custom' && (!customStartDate || !customEndDate))) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    setCurrentReportTitle(reportTitles[currentReportType]);
    setRecentReports([...recentReports, { id: recentReports.length + 1, name: currentReportTitle, date: new Date().toISOString().split('T')[0], format: reportFormat, type: currentReportType }]);
    setShowReportModal(false);
  };

  const deleteReport = (id: number) => {
    Alert.alert('Confirm', 'Are you sure you want to delete this report?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => setRecentReports(recentReports.filter(item => item.id !== id)) },
    ]);
  };

  return (
    <View style={getDynamicStyles().container}>
      <View style={getDynamicStyles().header}>
        <Text style={{ fontSize: width < 480 ? 18 : 20, fontWeight: '600' }}>Reports</Text>
        <TouchableOpacity style={getDynamicStyles().generateButton} onPress={() => setShowReportModal(true)}>
          <Feather name="plus" size={width < 480 ? 18 : 24} color="#fff" />
          <Text style={getDynamicStyles().buttonText}>Generate Report</Text>
        </TouchableOpacity>
      </View>
      {showReportModal && (
        <View style={getDynamicStyles().modalOverlay}>
          <View style={getDynamicStyles().modalContent}>
            <Text style={getDynamicStyles().modalTitle}>Generate New Report</Text>
            <View style={getDynamicStyles().formGrid}>
              <View style={getDynamicStyles().pickerContainer}>
                <Picker
                  selectedValue={currentReportType}
                  onValueChange={(itemValue) => setCurrentReportType(itemValue as ReportType | '')}
                  style={{ height: 50 }}
                >
                  <Picker.Item label="Select Report Type" value="" />
                  <Picker.Item label="Profit & Loss Statement" value="profit-loss" />
                  <Picker.Item label="Cash Flow Report" value="cash-flow" />
                  <Picker.Item label="Expense Analysis" value="expense-analysis" />
                </Picker>
              </View>
              <View style={getDynamicStyles().pickerContainer}>
                <Picker
                  selectedValue={reportPeriod}
                  onValueChange={(itemValue) => setReportPeriod(itemValue as string)}
                  style={{ height: 50 }}
                >
                  <Picker.Item label="This Month" value="this-month" />
                  <Picker.Item label="Last Month" value="last-month" />
                  <Picker.Item label="This Quarter" value="this-quarter" />
                  <Picker.Item label="Last Quarter" value="last-quarter" />
                  <Picker.Item label="Custom" value="custom" />
                </Picker>
              </View>
              {reportPeriod === 'custom' && (
                <>
                  <TextInput
                    style={getDynamicStyles().input}
                    placeholder="Start Date (YYYY-MM-DD)"
                    value={customStartDate}
                    onChangeText={setCustomStartDate}
                  />
                  <TextInput
                    style={getDynamicStyles().input}
                    placeholder="End Date (YYYY-MM-DD)"
                    value={customEndDate}
                    onChangeText={setCustomEndDate}
                  />
                </>
              )}
              <View style={getDynamicStyles().pickerContainer}>
                <Picker
                  selectedValue={reportFormat}
                  onValueChange={(itemValue) => setReportFormat(itemValue as string)}
                  style={{ height: 50 }}
                >
                  <Picker.Item label="PDF" value="pdf" />
                  <Picker.Item label="Excel" value="excel" />
                </Picker>
              </View>
            </View>
            <View style={getDynamicStyles().buttonContainer}>
              <TouchableOpacity style={getDynamicStyles().submitButton} onPress={generateReport}>
                <Text style={getDynamicStyles().buttonText}>Generate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={getDynamicStyles().cancelButton} onPress={() => setShowReportModal(false)}>
                <Text style={getDynamicStyles().buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <View style={getDynamicStyles().recentReports}>
        <Text style={getDynamicStyles().sectionTitle}>Recent Reports</Text>
        {recentReports.length > 0 ? recentReports.map((report) => (
          <View key={report.id} style={getDynamicStyles().reportItem}>
            <View style={getDynamicStyles().reportDetails}>
              <Text style={getDynamicStyles().reportName}>{report.name}</Text>
              <Text style={getDynamicStyles().reportDate}>{report.date}</Text>
            </View>
            <View style={getDynamicStyles().reportActions}>
              <TouchableOpacity onPress={() => Alert.alert('View', `Viewing ${report.name}`)}>
                <Text style={getDynamicStyles().actionText}>View</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Alert.alert('Download', `Downloading ${report.name}`)}>
                <Text style={getDynamicStyles().actionText}>Download</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteReport(report.id)}>
                <Text style={[getDynamicStyles().actionText, { color: '#ef4444' }]}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )) : (
          <View style={getDynamicStyles().emptyState}>
            <Text style={getDynamicStyles().emptyText}>No recent reports</Text>
            <Text style={getDynamicStyles().emptySubText}>Generate a new report to get started</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Report;