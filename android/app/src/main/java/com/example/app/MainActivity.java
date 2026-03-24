package com.example.app;

import android.os.Bundle;
import android.webkit.GeolocationPermissions;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings; // Added for hardware settings
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // 1. Enable Geolocation in WebSettings for hardware access
        WebSettings settings = this.bridge.getWebView().getSettings();
        settings.setGeolocationEnabled(true);
        settings.setJavaScriptEnabled(true); // Ensure JS can trigger the bridge

        // 2. Set the WebChromeClient to handle permission prompts automatically
        this.bridge.getWebView().setWebChromeClient(new WebChromeClient() {

            // Grants generic permission requests (Camera, Mic, etc.)
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                request.grant(request.getResources());
            }

            // Specifically handles the Geolocation prompt from the WebView
            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                // Parameters: origin, allow, retain (false ensures fresh check)
                callback.invoke(origin, true, false);
            }
        });
    }
}