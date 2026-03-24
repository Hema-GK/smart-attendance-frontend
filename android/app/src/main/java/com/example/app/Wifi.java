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

@CapacitorPlugin(
        name = "WiFiHardware",
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
        if (getPermissionState("location") != PermissionState.GRANTED) {
            requestPermissionForAlias("location", call, "locationCallback");
        } else {
            this.wifiService.getBSSID(call);
        }
    }

    @PermissionCallback
    private void locationCallback(PluginCall call) {
        if (getPermissionState("location") == PermissionState.GRANTED) {
            this.wifiService.getBSSID(call);
        } else {
            call.reject("Location permission is required to verify Wi-Fi hardware.");
        }
    }
}