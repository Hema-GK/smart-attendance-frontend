package com.example.app;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothManager;
import android.bluetooth.le.BluetoothLeScanner;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.bluetooth.le.ScanSettings;
import android.content.Context;
import android.content.pm.PackageManager;

import androidx.core.app.ActivityCompat;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.JSObject;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "BlePlugin")
public class BlePlugin extends Plugin {

    private BluetoothLeScanner scanner;
    private ScanCallback scanCallback;

    // ✅ IMPORTANT: NO @PluginMethod (to avoid your error)
    public void startScan(PluginCall call) {

        try {

            // ✅ Permission check (fixes warning)
            if (ActivityCompat.checkSelfPermission(
                    getContext(),
                    Manifest.permission.BLUETOOTH_SCAN
            ) != PackageManager.PERMISSION_GRANTED) {

                call.reject("Bluetooth permission not granted");
                return;
            }

            BluetoothManager manager = (BluetoothManager)
                    getContext().getSystemService(Context.BLUETOOTH_SERVICE);

            if (manager == null) {
                call.reject("Bluetooth manager not available");
                return;
            }

            BluetoothAdapter adapter = manager.getAdapter();

            if (adapter == null || !adapter.isEnabled()) {
                call.reject("Bluetooth is OFF");
                return;
            }

            scanner = adapter.getBluetoothLeScanner();

            if (scanner == null) {
                call.reject("Scanner not available");
                return;
            }

            ScanSettings settings = new ScanSettings.Builder()
                    .setScanMode(ScanSettings.SCAN_MODE_LOW_LATENCY)
                    .build();

            // ✅ FIX: create callback separately
            scanCallback = new ScanCallback() {

                @Override
                public void onScanResult(int callbackType, ScanResult result) {

                    if (result == null || result.getScanRecord() == null) return;

                    try {

                        byte[] data = result.getScanRecord()
                                .getManufacturerSpecificData(76); // Apple iBeacon

                        if (data != null && data.length >= 23) {

                            StringBuilder uuid = new StringBuilder();

                            for (int i = 2; i <= 17; i++) {
                                uuid.append(String.format("%02x", data[i]));
                            }

                            String formattedUUID =
                                    uuid.substring(0, 8) + "-" +
                                            uuid.substring(8, 12) + "-" +
                                            uuid.substring(12, 16) + "-" +
                                            uuid.substring(16, 20) + "-" +
                                            uuid.substring(20, 32);

                            int rssi = result.getRssi();

                            // 🔥 YOUR BEACON UUID (from your screenshot)
                            if (formattedUUID.equalsIgnoreCase("e2c56db5-dffb-48d2-b060-d0f5a71096e0")) {

                                JSObject ret = new JSObject();
                                ret.put("uuid", formattedUUID);
                                ret.put("rssi", rssi);

                                call.resolve(ret);

                                // ✅ FIXED stopScan
                                if (scanner != null && scanCallback != null) {
                                    scanner.stopScan(scanCallback);
                                }
                            }
                        }

                    } catch (Exception e) {
                        call.reject("Scan error: " + e.getMessage());
                    }
                }
            };

            // ✅ Start scan
            scanner.startScan(null, settings, scanCallback);

        } catch (SecurityException e) {
            call.reject("Permission denied: " + e.getMessage());
        }
    }
}