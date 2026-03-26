package com.example.app;

import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.content.Context;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.PluginMethod;

import org.json.JSONObject;

@CapacitorPlugin(name = "WifiPlugin")
public class WifiPlugin extends Plugin {

    @PluginMethod
    public void getBSSID(PluginCall call) {
        try {
            WifiManager wifiManager = (WifiManager) getContext().getApplicationContext().getSystemService(Context.WIFI_SERVICE);

            if (wifiManager == null) {
                call.reject("WiFi Manager not available");
                return;
            }

            WifiInfo wifiInfo = wifiManager.getConnectionInfo();

            String bssid = wifiInfo.getBSSID();

            JSONObject ret = new JSONObject();

            if (bssid == null) {
                ret.put("bssid", "00:00:00:00:00:00");
            } else {
                ret.put("bssid", bssid.toLowerCase());
            }

            call.resolve(ret);

        } catch (Exception e) {
            call.reject("Error getting BSSID: " + e.getMessage());
        }
    }
}