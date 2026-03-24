package com.example.app;// <-- Ensure this matches your ACTUAL package name

import android.content.Context;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    // This method is called by your JS/Capacitor bridge
    public String getBSSID() {
        WifiManager wifiManager = (WifiManager) getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        WifiInfo info = wifiManager.getConnectionInfo();
        if (info != null && info.getBSSID() != null) {
            // This returns the REAL MAC address (e.g., 92:8e:4e:ee:da:2b)
            return info.getBSSID().toLowerCase();
        }
        return "00:00:00:00:00:00";
    }
}