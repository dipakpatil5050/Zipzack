import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
  Dimensions
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { FlipHorizontal, Zap, ZapOff, Circle, Music, Clock, ImagePlus } from 'lucide-react-native';
import IconButton from '../../components/ui/IconButton';
import Button from '../../components/ui/Button';

const { width, height } = Dimensions.get('window');

export default function CreateScreen() {
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
    };
  }, []);
  
  if (!permission) {
    // Camera permissions are still loading
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Loading camera...</Text>
      </SafeAreaView>
    );
  }
  
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>We need your permission to show the camera</Text>
        <Button 
          onPress={requestPermission} 
          title="Grant Permission"
          style={{ marginTop: 16 }}
        />
      </SafeAreaView>
    );
  }
  
  const toggleCameraType = () => {
    setCameraType(current => (current === 'back' ? 'front' : 'back'));
  };
  
  const toggleFlash = () => {
    setFlashEnabled(current => !current);
  };
  
  const startRecording = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Not Available', 'Recording is not available on web');
      return;
    }
    
    if (cameraRef.current) {
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerId.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      // In a real app, you would actually start recording:
      // try {
      //   await cameraRef.current.recordAsync();
      // } catch (error) {
      //   console.error(error);
      // }
    }
  };
  
  const stopRecording = async () => {
    if (timerId.current) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
    
    setIsRecording(false);
    
    // In a real app, you would actually stop recording:
    // if (cameraRef.current) {
    //   try {
    //     await cameraRef.current.stopRecording();
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing={cameraType}
          enableZoomGesture
        />
        
        {/* Top controls */}
        <View style={styles.topControls}>
          <IconButton
            icon={flashEnabled ? Zap : ZapOff}
            onPress={toggleFlash}
            backgroundColor="rgba(0,0,0,0.5)"
            size={24}
          />
          
          {isRecording && (
            <View style={styles.recordingIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingTime}>{formatTime(recordingTime)}</Text>
            </View>
          )}
          
          <IconButton
            icon={FlipHorizontal}
            onPress={toggleCameraType}
            backgroundColor="rgba(0,0,0,0.5)"
            size={24}
          />
        </View>
        
        {/* Bottom controls */}
        <View style={styles.bottomControls}>
          <TouchableOpacity style={styles.sideButton}>
            <ImagePlus color="#FFFFFF" size={24} />
            <Text style={styles.sideButtonText}>Gallery</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.recordButton, isRecording && styles.recordingButton]}
            onPress={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? (
              <View style={styles.stopButton} />
            ) : (
              <Circle fill="#FF375F" color="#FF375F" size={62} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.sideButton}>
            <Music color="#FFFFFF" size={24} />
            <Text style={styles.sideButtonText}>Music</Text>
          </TouchableOpacity>
        </View>
        
        {/* Timer option */}
        <TouchableOpacity style={styles.timerButton}>
          <Clock color="#FFFFFF" size={20} />
          <Text style={styles.timerText}>Timer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
    padding: 20,
  },
  cameraContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  topControls: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  recordingIndicator: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF375F',
    marginRight: 6,
  },
  recordingTime: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sideButton: {
    alignItems: 'center',
  },
  sideButtonText: {
    color: '#FFFFFF',
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'transparent',
    borderWidth: 6,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordingButton: {
    borderColor: '#FF375F',
  },
  stopButton: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: '#FF375F',
  },
  timerButton: {
    position: 'absolute',
    right: 16,
    top: 80,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    color: '#FFFFFF',
    marginLeft: 6,
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});