import React, { useState } from 'react';
import { View, StyleSheet, Text, Button as NativeButton, Modal, SafeAreaView, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button } from '../ui/Button';
import { lookupBarcode } from '../../services/foodDatabase';
import { theme } from '../../constants/theme';

interface BarcodeScannerProps {
  onScan: (food: { name: string; calories: number }) => void;
}

export function BarcodeScanner({ onScan }: BarcodeScannerProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [processing, setProcessing] = useState(false);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.text}>We need your permission to show the camera</Text>
        <NativeButton onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarcodeScanned = async ({ type, data }: { type: string; data: string }) => {
    if (processing) return;
    setProcessing(true);
    
    try {
      const food = await lookupBarcode(data);
      if (food) {
        setScanning(false);
        onScan({ name: food.name, calories: food.calories });
      } else {
        Alert.alert('Not Found', 'Could not find product in Open Food Facts database.');
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to lookup product.');
    } finally {
      setTimeout(() => setProcessing(false), 2000); // 2s timeout before next scan allowed
    }
  };

  return (
    <>
      <Button 
        label="📱 Scan Barcode" 
        variant="ghost" 
        onPress={() => setScanning(true)} 
        style={styles.triggerButton}
      />
      <Modal visible={scanning} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.header}>Scan Barcode</Text>
          <View style={styles.cameraFrame}>
            <CameraView
              style={styles.camera}
              barcodeScannerSettings={{ barcodeTypes: ['upc_a', 'upc_e', 'ean13', 'ean8', 'qr'] }}
              onBarcodeScanned={handleBarcodeScanned}
            />
          </View>
          <View style={styles.footer}>
            {processing && <Text style={styles.processingText}>Looking up product...</Text>}
            <Button label="Cancel" variant="ghost" onPress={() => setScanning(false)} />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  triggerButton: {
    marginVertical: theme.spacing.xs,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...theme.typography.body,
    marginBottom: 8,
    color: theme.colors.text,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    ...theme.typography.h2,
    color: theme.colors.text,
    textAlign: 'center',
    marginVertical: theme.spacing.lg,
  },
  cameraFrame: {
    flex: 1,
    marginHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: theme.colors.primaryHover,
  },
  camera: {
    flex: 1,
  },
  footer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  processingText: {
    ...theme.typography.caption,
    color: theme.colors.success,
    marginBottom: theme.spacing.md,
  },
});
