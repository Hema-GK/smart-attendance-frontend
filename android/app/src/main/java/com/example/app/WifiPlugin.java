package com.example.app;

import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.content.Context;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.JSObject;

public class WifiPlugin extends Plugin {

    public void getBSSID(PluginCall call) {
        try {
            WifiManager wifiManager = (WifiManager) getContext()
                    .getApplicationContext()
                    .getSystemService(Context.WIFI_SERVICE);

            if (wifiManager == null) {
                call.reject("WiFi Manager not available");
                return;
            }

            WifiInfo wifiInfo = wifiManager.getConnectionInfo();

            String bssid = "00:00:00:00:00:00";

            if (wifiInfo != null && wifiInfo.getBSSID() != null) {
                bssid = wifiInfo.getBSSID();
            }

            // Android restriction
            if (bssid.equals("02:00:00:00:00:00")) {
                call.reject("Location OFF or restricted by Android");
                return;
            }

            JSObject ret = new JSObject();
            ret.put("bssid", bssid.toLowerCase());

            call.resolve(ret);

        } catch (Exception e) {
            call.reject("Error: " + e.getMessage());
        }
    }
}