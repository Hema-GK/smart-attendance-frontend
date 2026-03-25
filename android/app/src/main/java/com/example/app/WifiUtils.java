package com.example.app;

import android.content.Context;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;

public class WifiUtils {

    public static String getBSSID(Context context) {
        try {
            WifiManager wifiManager = (WifiManager) context.getApplicationContext()
                    .getSystemService(Context.WIFI_SERVICE);

            if (wifiManager == null) return "00:00:00:00:00:00";

            WifiInfo wifiInfo = wifiManager.getConnectionInfo();
            if (wifiInfo == null) return "00:00:00:00:00:00";

            String bssid = wifiInfo.getBSSID();

            if (bssid == null || bssid.equals("02:00:00:00:00:00")) {
                return "UNAVAILABLE";
            }

            return bssid;
        } catch (Exception e) {
            return "ERROR";
        }
    }
}