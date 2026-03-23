package com.example.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // The BridgeActivity handles the loading of the Capacitor plugins
        // and provides the interface for the React frontend to access hardware.
    }
}