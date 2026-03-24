package com.example.app;

import android.Manifest;
import android.os.Bundle;
import android.webkit.GeolocationPermissions;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import androidx.core.app.ActivityCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 1. SYSTEM PERMISSION REQUEST (The "Wake Up" Call)
        // Android 10+ will return 00:00:00:00:00:00 if these aren't granted at the OS level.
        ActivityCompat.requestPermissions(this, new String[]{
                Manifest.permission.ACCESS_FINE_LOCATION,
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.ACCESS_WIFI_STATE,
                Manifest.permission.CHANGE_WIFI_STATE
        }, 1);

        // 2. WEBVIEW SETTINGS
        WebSettings settings = this.bridge.getWebView().getSettings();
        settings.setGeolocationEnabled(true);
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true); // Added to support modern web storage

        // 3. WEBCHROME CLIENT
        this.bridge.getWebView().setWebChromeClient(new WebChromeClient() {

            // Automatically grants Camera and Microphone access for Face Recognition
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                request.grant(request.getResources());
            }

            // Automatically handles the Geolocation bridge between WebView and Android GPS
            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                // Parameters: origin, allow (true), retain (false ensures a fresh check each time)
                callback.invoke(origin, true, false);
            }
        });
    }
}