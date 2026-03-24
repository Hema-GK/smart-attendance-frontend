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
        name = "Wifi",

        permissions = {
                @Permission(
                        alias = "location",
                        strings = { Manifest.permission.ACCESS_FINE_LOCATION }
                )
        }
)
public class Wifi extends Plugin {
    private com.example.app.WifiService wifiService;

    @Override
    public void load() {
        super.load();
        this.wifiService = new com.example.app.WifiService();
        this.wifiService.load(this.bridge);
    }

    @PluginMethod()
    public void getBSSID(PluginCall call) {
        if (getPermissionState("location") != PermissionState.GRANTED) {
            requestPermissionForAlias("location", call, "locationCallback");
        } else {
            this.wifiService.getBSSID(call);
        }
    }

    @PluginMethod()
    public void scan(PluginCall call) {
        if (getPermissionState("location") != PermissionState.GRANTED) {
            requestPermissionForAlias("location", call, "locationCallback");
        } else {
            this.wifiService.scanNetwork(call);
        }
    }

    @PluginMethod()
    public void getWifiIP(PluginCall call) {
        // IP doesn't strictly require location on all versions, but we route it through service
        this.wifiService.getWifiIP(call);
    }

    @PluginMethod()
    public void getConnectedSSID(PluginCall call) {
        if (getPermissionState("location") != PermissionState.GRANTED) {
            requestPermissionForAlias("location", call, "locationCallback");
        } else {
            this.wifiService.getConnectedSSID(call);
        }
    }

    @PermissionCallback
    private void locationCallback(PluginCall call) {
        if (getPermissionState("location") == PermissionState.GRANTED) {
            String methodName = call.getMethodName();

            // This logic ensures that once the user clicks "Allow",
            // the app immediately finishes the task they started.
            if (methodName.equals("getBSSID")) {
                this.wifiService.getBSSID(call);
            } else if (methodName.equals("scan")) {
                this.wifiService.scanNetwork(call);
            } else if (methodName.equals("getConnectedSSID")) {
                this.wifiService.getConnectedSSID(call);
            }
        } else {
            call.reject("User denied location permission");
        }
    }
}