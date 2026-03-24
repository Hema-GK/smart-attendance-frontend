package com.example.app;

import android.Manifest;
import android.content.Context;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.JSObject;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.PermissionState;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;

@CapacitorPlugin(
        name = "WiFiHardware",
        permissions = {
                @Permission(
                        alias = "location",
                        strings = { Manifest.permission.ACCESS_FINE_LOCATION }
                )
        }
)
public class MainActivity extends BridgeActivity {

    @PluginMethod
    public void getRealBSSID(PluginCall call) {
        // Step 1: Force a permission check at the hardware level
        if (getPermissionState("location") != PermissionState.GRANTED) {
            requestPermissionForAlias("location", call, "checkPermissionCallback");
            return;
        }

        // Step 2: Get the Wi-Fi Manager
        WifiManager wifiManager = (WifiManager) getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        WifiInfo info = wifiManager.getConnectionInfo();

        JSObject ret = new JSObject();
        if (info != null && info.getBSSID() != null) {
            String bssid = info.getBSSID();

            // Step 3: Check if the OS is still masking it
            if (bssid.equals("02:00:00:00:00:00") || bssid.equals("00:00:00:00:00:00")) {
                call.reject("OS_MASKED_BSSID: Enable GPS and Precise Location Settings");
            } else {
                ret.put("bssid", bssid.toLowerCase());
                call.resolve(ret);
            }
        } else {
            call.reject("WIFI_INFO_UNAVAILABLE");
        }
    }
}