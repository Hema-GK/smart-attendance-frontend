package com.example.app;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Build;
import androidx.core.app.ActivityCompat;
import com.getcapacitor.Bridge;
import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;

public class WifiService {
    private WifiManager wifiManager;
    private ConnectivityManager connectivityManager;
    private Context context;

    public void load(Bridge bridge) {
        this.context = bridge.getContext();
        if (this.context != null) {
            this.wifiManager = (WifiManager) this.context.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
            this.connectivityManager = (ConnectivityManager) this.context.getApplicationContext().getSystemService(Context.CONNECTIVITY_SERVICE);
        }
    }

    public void getBSSID(PluginCall call) {
        // Step 1: Check Permissions
        if (ActivityCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            call.reject("PERMISSION_DENIED");
            return;
        }

        try {
            String bssid = null;

            // Step 2: Handle API Level 29+ (Android 10+) vs Older Versions
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                // For API 29+, we use the modern NetworkCapabilities approach
                Network activeNetwork = connectivityManager.getActiveNetwork();
                if (activeNetwork != null) {
                    NetworkCapabilities capabilities = connectivityManager.getNetworkCapabilities(activeNetwork);
                    if (capabilities != null) {
                        // This handles the transport info requirement you provided
                        Object transportInfo = capabilities.getTransportInfo();
                        if (transportInfo instanceof WifiInfo) {
                            bssid = ((WifiInfo) transportInfo).getBSSID();
                        }
                    }
                }
            }

            // Fallback: If BSSID is still null, try the standard method (works for most legacy/standard cases)
            if (bssid == null) {
                WifiInfo info = wifiManager.getConnectionInfo();
                bssid = info.getBSSID();
            }

            // Step 3: Check for Masked BSSID
            if (bssid == null || bssid.equals("02:00:00:00:00:00") || bssid.equals("00:00:00:00:00:00")) {
                call.reject("BSSID_MASKED: Enable GPS and Precise Location in Settings");
                return;
            }

            // Step 4: Return Result
            JSObject ret = new JSObject();
            ret.put("bssid", bssid.toLowerCase());
            call.resolve(ret);

        } catch (Exception e) {
            call.reject("HARDWARE_ERROR: " + e.getMessage());
        }
    }
}