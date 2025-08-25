import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  Alert,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Feather from 'react-native-vector-icons/Feather';

type ReportType = 'profit-loss' | 'cash-flow' | 'expense-analysis';

const Report = () => {
  const { width } = useWindowDimensions();
  const [showReportModal, setShowReportModal] = useState(false);
  const [currentReportType, setCurrentReportType] = useState<ReportType | ''>('');
  const [reportPeriod, setReportPeriod] = useState('this-month');
  const [reportFormat, setReportFormat] = useState('pdf');
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');
  const [recentReports, setRecentReports] = useState([
    { id: 1, name: 'January 2024 P&L Statement', date: '2024-01-15', format: 'pdf', type: 'profit-loss' },
    { id: 2, name: 'Q4 2023 Cash Flow Report', date: '2024-01-08', format: 'excel', type: 'cash-flow' },
  ]);

  const reportTitles: Record<ReportType, string> = {
    'profit-loss': 'Profit & Loss Statement',
    'cash-flow': 'Cash Flow Report',
    'expense-analysis': 'Expense Analysis',
  };

  const styles = getDynamicStyles(width);

  const generateReport = () => {
    if (!currentReportType || (reportPeriod === 'custom' && (!customStartDate || !customEndDate))) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    const newReport = {
      id: recentReports.length + 1,
      name: reportTitles[currentReportType],
      date: new Date().toISOString().split('T')[0],
      format: reportFormat,
      type: currentReportType,
    };
    setRecentReports([newReport, ...recentReports]);
    setShowReportModal(false);
  };

  const deleteReport = (id: number) => {
    Alert.alert('Confirm', 'Delete this report?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => setRecentReports(recentReports.filter((r) => r.id !== id)) },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Reports</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setShowReportModal(true)}>
            <Feather name="plus" size={18} color="#fff" />
            <Text style={styles.buttonText}>Generate</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Reports */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Reports</Text>
          {recentReports.length > 0 ? (
            recentReports.map((report, i) => (
              <View key={report.id} style={[styles.reportItem, i % 2 === 1 && { backgroundColor: '#f9fafb' }]}>
                <View style={styles.reportInfo}>
                  <Text style={styles.reportName}>{report.name}</Text>
                  <Text style={styles.reportDate}>{report.date}</Text>
                </View>
                <View style={styles.reportActions}>
                  <TouchableOpacity onPress={() => Alert.alert('View', `Viewing ${report.name}`)}>
                    <Text style={styles.actionText}>View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Alert.alert('Download', `Downloading ${report.name}`)}>
                    <Text style={styles.actionText}>Download</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteReport(report.id)}>
                    <Text style={[styles.actionText, { color: '#ef4444' }]}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No recent reports</Text>
              <Text style={styles.emptySubText}>Generate a report to get started</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal visible={showReportModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.modalTitle}>Generate Report</Text>

            {/* Report Type */}
            <View style={styles.pickerBox}>
              <Picker selectedValue={currentReportType} onValueChange={(v) => setCurrentReportType(v as ReportType | '')}>
                <Picker.Item label="Select Report Type" value="" />
                <Picker.Item label="Profit & Loss Statement" value="profit-loss" />
                <Picker.Item label="Cash Flow Report" value="cash-flow" />
                <Picker.Item label="Expense Analysis" value="expense-analysis" />
              </Picker>
            </View>

            {/* Report Period */}
            <View style={styles.pickerBox}>
              <Picker selectedValue={reportPeriod} onValueChange={(v) => setReportPeriod(v as string)}>
                <Picker.Item label="This Month" value="this-month" />
                <Picker.Item label="Last Month" value="last-month" />
                <Picker.Item label="This Quarter" value="this-quarter" />
                <Picker.Item label="Last Quarter" value="last-quarter" />
                <Picker.Item label="Custom" value="custom" />
              </Picker>
            </View>

            {reportPeriod === 'custom' && (
              <>
                <TextInput style={styles.input} placeholder="Start Date (YYYY-MM-DD)" value={customStartDate} onChangeText={setCustomStartDate} />
                <TextInput style={styles.input} placeholder="End Date (YYYY-MM-DD)" value={customEndDate} onChangeText={setCustomEndDate} />
              </>
            )}

            {/* Format */}
            <View style={styles.pickerBox}>
              <Picker selectedValue={reportFormat} onValueChange={(v) => setReportFormat(v as string)}>
                <Picker.Item label="PDF" value="pdf" />
                <Picker.Item label="Excel" value="excel" />
              </Picker>
            </View>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.submitButton} onPress={generateReport}>
                <Text style={styles.buttonText}>Generate</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setShowReportModal(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const getDynamicStyles = (width: number) =>
  StyleSheet.create({
    container: { padding: 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    title: { fontSize: 22, fontWeight: '700', color: '#111827' },
    addButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#10b981', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, gap: 6 },
    buttonText: { color: '#fff', fontWeight: '600' },

    section: { marginTop: 8 },
    sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#1f2937' },

    reportItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
    reportInfo: { flex: 1 },
    reportName: { fontSize: 14, fontWeight: '600', color: '#111827' },
    reportDate: { fontSize: 12, color: '#6b7280' },
    reportActions: { flexDirection: 'row', gap: 12 },
    actionText: { fontSize: 13, fontWeight: '600', color: '#10b981' },

    emptyState: { padding: 32, alignItems: 'center' },
    emptyText: { fontSize: 15, fontWeight: '500', color: '#6b7280', marginBottom: 4 },
    emptySubText: { fontSize: 12, color: '#9ca3af' },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: '#fff', borderRadius: 12, padding: 16, width: '85%' },
    modalTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12, textAlign: 'center' },
    input: { padding: 10, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, marginBottom: 8 },

    pickerBox: { borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, marginBottom: 8 },
    buttonRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
    submitButton: { flex: 1, backgroundColor: '#10b981', padding: 12, borderRadius: 8, alignItems: 'center' },
    cancelButton: { flex: 1, backgroundColor: '#d1d5db', padding: 12, borderRadius: 8, alignItems: 'center' },
  });

export default Report;
