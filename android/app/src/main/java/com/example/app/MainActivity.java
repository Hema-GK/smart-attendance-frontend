package com.example.app;// <-- Ensure this matches your ACTUAL package name



import android.content.Context;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "WiFiHardware")
public class MainActivity extends BridgeActivity {

    @PluginMethod
    public void getRealBSSID(PluginCall call) {
        WifiManager wifiManager = (WifiManager) getApplicationContext().getSystemService(Context.WIFI_SERVICE);
        WifiInfo info = wifiManager.getConnectionInfo();

        JSObject ret = new JSObject();
        if (info != null && info.getBSSID() != null) {
            ret.put("bssid", info.getBSSID().toLowerCase());
        } else {
            ret.put("bssid", "00:00:00:00:00:00");
        }
        call.resolve(ret);
    }
}