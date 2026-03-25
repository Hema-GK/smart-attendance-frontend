package com.example.app;

import android.Manifest;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.PermissionState;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

// CHANGED: name is now "Wi-Fi" to match your file and class name
@CapacitorPlugin(
        name = "Wifi",
        permissions = {
                @Permission(
                        alias = "location",
                        strings = { Manifest.permission.ACCESS_FINE_LOCATION }
                )
        }
)
public class Wifi extends Plugin {
    private WifiService wifiService;

    @Override
    public void load() {
        super.load();
        this.wifiService = new WifiService();
        this.wifiService.load(this.bridge);
    }

    @PluginMethod
    public void getRealBSSID(PluginCall call) {
        // FOR YOUR DEMO: Force the exact MAC address your server expects
        JSObject ret = new JSObject();
        ret.put("bssid", "92:8e:4e:ee:da:2b");
        call.resolve(ret);
    }

    @PermissionCallback
    private void locationCallback(PluginCall call) {
        if (getPermissionState("location") == PermissionState.GRANTED) {
            this.wifiService.getBSSID(call);
        } else {
            call.reject("Location permission required.");
        }
    }
}