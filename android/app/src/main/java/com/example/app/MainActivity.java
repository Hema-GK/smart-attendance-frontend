package io.ionic.starter; // Ensure this matches your package name in capacitor.config.json

import android.content.Context;
import android.net.wifi.WifiInfo;
import android.net.wifi.WifiManager;
import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    /**
     * This method retrieves the actual BSSID from the Android System.
     * Note: Returns "02:00:00:00:00:00" or null if Permissions/GPS are off.
     */
    public String getRealBSSID() {
        try {
            WifiManager wifiManager = (WifiManager) getApplicationContext().getSystemService(Context.WIFI_SERVICE);
            WifiInfo info = wifiManager.getConnectionInfo();
            if (info != null && info.getBSSID() != null) {
                return info.getBSSID(); // This returns the actual MAC address
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "00:00:00:00:00:00";
    }
}