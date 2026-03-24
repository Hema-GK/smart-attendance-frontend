package com.example.app;// <-- Ensure this matches your ACTUAL package name

import android.content.Context;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    public String getRealBSSID() {
        WifiManager wifiManager = (WifiManager) getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        WifiInfo info = wifiManager.getConnectionInfo();
        if (info != null && info.getBSSID() != null) {
            return info.getBSSID().toLowerCase();
        }
        return "00:00:00:00:00:00";
    }
}