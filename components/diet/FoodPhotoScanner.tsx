import React, { useState } from 'react';
import { View, StyleSheet, Text, Button as NativeButton, Modal, SafeAreaView, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button } from '../ui/Button';
import { api } from '../../services/api';
import { theme } from '../../constants/theme';

interface FoodPhotoScannerProps {
  onScan: (food: { name: string; calories: number }) => void;
}

export function FoodPhotoScanner({ onScan }: FoodPhotoScannerProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);
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

  const takePictureAndAnalyze = async () => {
    if (!cameraRef || processing) return;
    setProcessing(true);

    try {
      const photo = await cameraRef.takePictureAsync({ base64: true, quality: 0.5 });
      
      // Call Phase 3 AI Vision endpoint:
      if (photo && photo.base64) {
        const { data } = await api.post('/ai/scan-food', { image: photo.base64 });
        setScanning(false);
        onScan({ name: data.name, calories: data.calories });
      }
    } catch (error) {
      console.error('Photo analysis failed', error);
      Alert.alert('Analysis Failed', 'Could not process the food image.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <Button 
        label="📸 Photo Scan (AI)" 
        variant="ghost" 
        onPress={() => setScanning(true)} 
        style={styles.triggerButton}
      />
      <Modal visible={scanning} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <Text style={styles.header}>Snap your meal</Text>
          <View style={styles.cameraFrame}>
            <CameraView 
              style={styles.camera} 
              ref={(ref) => setCameraRef(ref)}
            />
          </View>
          <View style={styles.footer}>
            <Button 
              label={processing ? "Analyzing Elements..." : "Capture"} 
              onPress={takePictureAndAnalyze} 
              isLoading={processing}
              style={{ flex: 1, marginRight: 8 }}
            />
            <Button 
              label="Cancel" 
              variant="ghost" 
              onPress={() => { setScanning(false); setProcessing(false); }} 
              style={{ width: 100 }}
              disabled={processing}
            />
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
    borderColor: theme.colors.accent, // Different color than barcode to distinguish
  },
  camera: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    padding: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
