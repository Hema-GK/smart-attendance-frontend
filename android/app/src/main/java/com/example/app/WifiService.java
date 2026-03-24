package com.example.app;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.net.ConnectivityManager;
import android.net.Network;
import android.net.NetworkCapabilities;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import androidx.core.app.ActivityCompat;
import com.getcapacitor.Bridge;
import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;

public class WifiService {
    private WifiManager wifiManager;
    private ConnectivityManager connectivityManager;
    private Context context;
    private Bridge bridge;

    public void load(Bridge bridge) {
        this.bridge = bridge;
        this.context = this.bridge.getContext();
        if (this.context != null) {
            this.wifiManager = (WifiManager) this.context.getApplicationContext().getSystemService(Context.WIFI_SERVICE);
            this.connectivityManager = (ConnectivityManager) this.context.getApplicationContext().getSystemService(Context.CONNECTIVITY_SERVICE);
        }
    }

    public void getBSSID(PluginCall call) {
        if (ActivityCompat.checkSelfPermission(context, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            call.reject("LOCATION_PERMISSION_REQUIRED");
            return;
        }

        try {
            ConnectivityManager connManager = (ConnectivityManager) context.getSystemService(Context.CONNECTIVITY_SERVICE);
            Network network = connManager.getActiveNetwork();
            NetworkCapabilities capabilities = connManager.getNetworkCapabilities(network);

            if (capabilities != null && capabilities.hasTransport(NetworkCapabilities.TRANSPORT_WIFI)) {
                Object transportInfo = capabilities.getTransportInfo();
                if (transportInfo instanceof WifiInfo) {
                    WifiInfo info = (WifiInfo) transportInfo;
                    String bssid = info.getBSSID();
                    if (bssid != null && !bssid.contains("00:00")) {
                        JSObject ret = new JSObject();
                        ret.put("bssid", bssid.toLowerCase());
                        call.resolve(ret);
                        return;
                    }
                }
            }

            // Fallback
            WifiInfo standardInfo = wifiManager.getConnectionInfo();
            String fallback = standardInfo.getBSSID();
            JSObject res = new JSObject();
            res.put("bssid", fallback != null ? fallback.toLowerCase() : "00:00:00:00:00:00");
            call.resolve(res);

        } catch (Exception e) {
            call.reject(e.getMessage());
        }
    }

    // ... Other methods (scan, connect) remain the same ...
}