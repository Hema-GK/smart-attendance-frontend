package com.example.app;

import android.content.Context;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.JSObject;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "WifiPlugin")
public class WifiPlugin extends Plugin {

    public void getWifiInfo(PluginCall call) {
        try {
            WifiManager wifiManager = (WifiManager) getContext()
                    .getApplicationContext()
                    .getSystemService(Context.WIFI_SERVICE);

            if (wifiManager == null) {
                call.reject("WiFi not available");
                return;
            }

            WifiInfo wifiInfo = wifiManager.getConnectionInfo();

            String ssid = wifiInfo.getSSID();
            int rssi = wifiInfo.getRssi(); // 🔥 SIGNAL STRENGTH

            JSObject ret = new JSObject();

            if (ssid == null || ssid.equals("<unknown ssid>")) {
                ret.put("ssid", "UNKNOWN");
            } else {
                ret.put("ssid", ssid.replace("\"", ""));
            }

            ret.put("rssi", rssi); // 🔥 ADD RSSI

            call.resolve(ret);

        } catch (Exception e) {
            call.reject("Error: " + e.getMessage());
        }
    }
}