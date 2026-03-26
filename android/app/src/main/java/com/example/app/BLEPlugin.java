package com.example.app;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothManager;
import android.bluetooth.le.BluetoothLeScanner;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.bluetooth.le.ScanSettings;
import android.content.Context;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.JSObject;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.PluginMethod;

@CapacitorPlugin(name = "BlePlugin")
public class BlePlugin extends Plugin {

    private BluetoothLeScanner scanner;

    @PluginMethod
    public void startScan(PluginCall call) {

        BluetoothManager manager = (BluetoothManager)
                getContext().getSystemService(Context.BLUETOOTH_SERVICE);

        BluetoothAdapter adapter = manager.getAdapter();

        if (adapter == null || !adapter.isEnabled()) {
            call.reject("Bluetooth not enabled");
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

        scanner.startScan(null, settings, new ScanCallback() {
            @Override
            public void onScanResult(int callbackType, ScanResult result) {

                int rssi = result.getRssi(); // 🔥 THIS IS IMPORTANT

                byte[] data = result.getScanRecord().getManufacturerSpecificData(76); // Apple ID

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

                    JSObject ret = new JSObject();
                    ret.put("uuid", formattedUUID);
                    ret.put("rssi", rssi); // 🔥 SEND RSSI

                    call.resolve(ret);
                    scanner.stopScan(this);
                }
            }
        });
    }
}