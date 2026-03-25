package com.example.app;

import android.content.Context;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.getcapacitor.JSObject;

@CapacitorPlugin(name = "WifiPlugin")
public class WifiPlugin extends Plugin {

    @PluginMethod
    public void getBSSID(PluginCall call) {
        JSObject ret = new JSObject();

        try {
            WifiManager wifiManager = (WifiManager) getContext()
                    .getApplicationContext()
                    .getSystemService(Context.WIFI_SERVICE);

            if (wifiManager == null) {
                ret.put("bssid", "UNAVAILABLE");
                call.resolve(ret);
                return;
            }

            WifiInfo wifiInfo = wifiManager.getConnectionInfo();
            String bssid = wifiInfo.getBSSID();

            if (bssid == null || bssid.equals("02:00:00:00:00:00")) {
                ret.put("bssid", "UNAVAILABLE");
            } else {
                ret.put("bssid", bssid.toLowerCase());
            }

            call.resolve(ret);

        } catch (Exception e) {
            ret.put("bssid", "ERROR");
            call.resolve(ret);
        }
    }
}