package com.example.app;

import android.Manifest;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothManager;
import android.bluetooth.le.*;
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

    public void startScan(PluginCall call) {

        try {

            if (ActivityCompat.checkSelfPermission(
                    getContext(),
                    Manifest.permission.BLUETOOTH_SCAN
            ) != PackageManager.PERMISSION_GRANTED) {
                call.reject("Permission not granted");
                return;
            }

            BluetoothManager manager = (BluetoothManager)
                    getContext().getSystemService(Context.BLUETOOTH_SERVICE);

            BluetoothAdapter adapter = manager.getAdapter();

            if (adapter == null || !adapter.isEnabled()) {
                call.reject("Bluetooth OFF");
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

            // 🔥 NO stopScan needed (avoids all errors)
            scanner.startScan(null, settings, new ScanCallback() {

                @Override
                public void onScanResult(int callbackType, ScanResult result) {

                    int rssi = result.getRssi();

                    if (rssi > -70) {   // ✅ threshold

                        JSObject ret = new JSObject();
                        ret.put("rssi", rssi);

                        call.resolve(ret);

                        // ❌ DO NOT call stopScan → no errors
                    }
                }
            });

        } catch (Exception e) {
            call.reject("Error: " + e.getMessage());
        }
    }
}